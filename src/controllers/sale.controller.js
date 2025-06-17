import * as salesModel from "../models/sale.model.js";
import * as profileModel from "../models/profile.model.js";
import * as authModel from "../models/auth.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as profileChecker from "../libs/checker.js";
import { calculateDistance } from "../libs/calc.js";
import * as qualityParamsModel from "../models/qualityParams.model.js";
import * as notificationService from "../services/notification.service.js";
import { v4 as uuidv4 } from "uuid";

export const createSale = async (req, res) => {
  try {
    const product_id = req.params.id;
    const user_id = req.user_id;
    const sale_id = uuidv4();

    const insertSale = await salesModel.createSale(
      sale_id,
      product_id,
      user_id,
      req.body.sale
    );

    if (insertSale > 0) {
      const receptors =
        await notificationService.getBuyerNotificationsReceptors();
      if (receptors.length > 0) {
        await notificationService.sendPushNotification(
          "Nueva publicación de " + product_id,
          "Revisa las ofertas del mercado",
          receptors,
          "/sale/" + product_id + "/" + sale_id
        );
      }

      if (req.body.quality_params) {
        for (const param of req.body.quality_params) {
          const newParamRowId = uuidv4();
          await qualityParamsModel.createQualityParam(
            newParamRowId,
            user_id,
            param
          );
          await qualityParamsModel.createQualityParamForSale(
            newParamRowId,
            sale_id
          );
        }
      }

      return res
        .status(200)
        .send({ message: `Venta publicada con exito`, uuid: sale_id });
    }

    throw new Error("La creacion de la venta ha fallado, intenta nuevamente");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const sale_id = req.params.id;
    const user_id = req.user_id;

    const proposals = await proposalModel.getProposalsBySale(sale_id);

    if (Array(...proposals).length > 0) {
      req.body.sale.cantidad = proposals[0].cantidad;
    }

    const insertSale = await salesModel.updateSale(sale_id, req.body.sale);

    if (insertSale > 0) {
      if (req.body.quality_params) {
        for (const param of req.body.quality_params) {
          if (param.id == "") {
            const newParamRowId = uuidv4();
            await qualityParamsModel.createQualityParam(
              newParamRowId,
              user_id,
              param
            );
            await qualityParamsModel.createQualityParamForSale(
              newParamRowId,
              sale_id
            );
          }
        }
      }

      return res
        .status(200)
        .send({ message: `Venta actualizada con exito`, uuid: sale_id });
    }

    throw new Error(
      "La actualización de la venta ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const insertImageSale = async (req, res) => {
  try {
    const sale_id = req.params.id;

    if (req.images_urls) {
      for (const image of req.images_urls) {
        await salesModel.insertSaleImage(uuidv4(), sale_id, image);
      }
      return res.status(200).json({ message: "Imagenes subidas con exito" });
    }

    throw new Error("La subida de la imagen ha fallado, intenta nuevamente");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSalesByProduct = async (req, res) => {
  try {
    const { radius, prov } = req.query;

    if (radius) {
      const request_user = await authModel.getAccountById(req.user_id);
      const rawSales = await salesModel.getSalesByProductWithLocationData(req.params.id);

      let filteredSales = await rawSales.filter((sale) => {
        const dist = calculateDistance(
          request_user.ubicacion_latitud,
          request_user.ubicacion_longitud,
          sale.ubicacion_latitud,
          sale.ubicacion_longitud
        )
        return dist <= radius
      });

      if(prov){
        filteredSales = filteredSales.filter(sale => sale.provincia == prov)
      }

      res.status(200).json(filteredSales);
      return;
    }

    const productSales = await salesModel.getSalesByProduct(
      req.params.id,
      req.user_id
    );

    if (productSales) {
      return res.status(200).json(productSales);
    }

    throw new Error("La obtención de las ventas ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSalesByUser = async (req, res) => {
  try {
    const userSales = await salesModel.getSalesByUser(req.user_id);

    if (userSales) {
      return res.status(200).json(userSales);
    }

    throw new Error("La obtención de las ventas ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSaleByIdentifier = async (req, res) => {
  try {
    const sale = await salesModel.getSaleByIdentifier(req.params.id);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSaleByIdentifierAndProduct = async (req, res) => {
  try {
    const sale = await salesModel.getSaleByIdentifierAndProduct(
      req.params.sale,
      req.params.id
    );

    let sellerProfile;

    if (await profileChecker.isAssociationAgricultural(sale.id_usuario)) {
      sellerProfile =
        await profileModel.getAssociationAgriculturalProfileByUser(
          sale.id_usuario
        );
      return res.status(200).json({
        ...sale,
        ...sellerProfile,
        type: "Asociación Agricola",
      });
    }
    if (await profileChecker.isFarmerProfile(sale.id_usuario)) {
      sellerProfile = await profileModel.getFarmerProfileByUser(
        sale.id_usuario
      );
      return res.status(200).json({
        ...sale,
        ...sellerProfile,
        type: "Agricultor",
      });
    }
    if (await profileChecker.isMerchant(sale.id_usuario)) {
      sellerProfile = await profileModel.getMerchantProfileByUser(
        sale.id_usuario
      );
      return res.status(200).json({
        ...sale,
        ...sellerProfile,
        type: "Comerciante",
      });
    }
    if (await profileChecker.isMerchantAgrochemical(sale.id_usuario)) {
      sellerProfile = await profileModel.getMerchantAgrochemicalProfileByUser(
        sale.id_usuario
      );
      return res.status(200).json({
        ...sale,
        ...sellerProfile,
        type: "Comerciante Agroquimicos",
      });
    }

    throw new Error("La obtención de las ventas ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const { filter, id } = req.query;

    if (id) {
      const sale = await salesModel.getFullSaleByIdentifier(id);
      res.status(200).json(sale);
      return;
    }

    if (filter) {
      const sales = await salesModel.getAllSalesNotFiltered();
      res.status(200).json(sales);
      return;
    }

    const sales = await salesModel.getAllSales();

    if (sales) {
      return res.status(200).json(sales);
    }

    throw new Error("La obtención de las ventas ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const deletedRow = await salesModel.deleteSale(req.user_id, req.params.id);

    if (deletedRow > 0) {
      return res.status(200).json({ message: "Venta eliminada correctamente" });
    }

    throw new Error(
      "La eliminación de la venta ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteParam = async (req, res) => {
  try {
    const deletedRow = await qualityParamsModel.deleteQualityParamForSale(
      req.params.id,
      req.params.sale,
      req.user_id
    );

    if (deletedRow > 0) {
      return res
        .status(200)
        .json({ message: "Parametros eliminados correctamente" });
    }

    throw new Error(
      "La eliminación del parametro ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const deleteImage = async (req, res) => {
  try {
    const sale = await salesModel.getSaleByIdentifier(req.params.sale);

    if (sale.images.length == 1) {
      throw new Error("Debes tener al menos dos imagenes para eliminar una");
    }

    const deletedRow = await salesModel.deleteImage(req.params.id);

    if (deletedRow > 0) {
      return res
        .status(200)
        .json({ message: "Imagen eliminada correctamente" });
    }

    throw new Error(
      "La eliminación de la imagen ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
