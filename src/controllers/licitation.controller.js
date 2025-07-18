import * as licitationModel from "../models/licitations.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as qualityParamsModel from "../models/qualityParams.model.js";
import * as notificationService from "../services/notification.service.js";
import { calculateDistance } from "../libs/calc.js";
import * as authModel from "../models/auth.model.js";
import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";

const cache = new NodeCache({ stdTTL: 120 }); // 5 minutos por defecto
const key = "licitations_";

export const createLicitation = async (req, res) => {
  try {
    const product_id = req.params.id;
    const user_id = req.user_id;
    const licitation_id = uuidv4();

    const insertLicitation = await licitationModel.createLicitation(
      licitation_id,
      product_id,
      user_id,
      req.body.licitation
    );
  
    if (insertLicitation > 0) {
      const receptors = await notificationService.getSellerNotificationsReceptors();
      if(receptors.length > 0){
        await notificationService.sendPushNotification(
          "Nueva licitación de " + product_id,
          "Revisa las ofertas del mercado",
          receptors,
          "/info/licitacion/" + product_id + "/" + licitation_id
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
          await qualityParamsModel.createQualityParamForLicitation(
            newParamRowId,
            licitation_id
          );
        }
      }

      return res.status(200).send({ message: `Licitacion creada con exito` });
    }

    throw new Error(
      "La creacion de la licitacion ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateLicitation = async (req, res) => {
  try {
    const licitation_id = req.params.id;
    const user_id = req.user_id;

    const proposals = await proposalModel.getProposalsByLicitation(licitation_id);

    if(Array(...proposals).length > 0){
      req.body.licitation.cantidad = proposals[0].cantidad;
    }

    const updateRow = await licitationModel.updateLicitation(
      licitation_id,
      user_id,
      req.body.licitation
    );

    if (updateRow > 0) {
      if (req.body.quality_params) {
        for (const param of req.body.quality_params) {
          if (param.id == "") {
            const newParamRowId = uuidv4();
            await qualityParamsModel.createQualityParam(
              newParamRowId,
              user_id,
              param
            );
            await qualityParamsModel.createQualityParamForLicitation(
              newParamRowId,
              licitation_id
            );
          } else {
            continue;
          }
        }
      }

      return res
        .status(200)
        .send({ message: `Licitacion actualizada con exito` });
    }

    throw new Error(
      "La actualización de la licitacion ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationsByUser = async (req, res) => {
  try {
    const userLicitations = await licitationModel.getLicitationsByUser(
      req.user_id
    );

    if (userLicitations) {
      return res.status(200).json(userLicitations);
    }

    throw new Error("La obtención de las licitaciones ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationsByUserAndProduct = async (req, res) => {
  try {
    const userLicitations =
      await licitationModel.getLicitationsByUserAndProduct(
        req.user_id,
        req.params.id
      );

    if (userLicitations) {
      return res.status(200).json(userLicitations);
    }

    throw new Error("La obtención de las licitaciones ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllLicitations = async (req, res) => {
  try {
    const { filter, product, radius, prov } = req.query;

    if (radius) {
      const request_user = await authModel.getAccountById(req.user_id);
      const rawLicitations = await licitationModel.getLicitationsByProductWithLocationData(product);

      let filteredLicitations = await rawLicitations.filter((licitation) => {
        const dist = calculateDistance(
          request_user.ubicacion_latitud,
          request_user.ubicacion_longitud,
          licitation.ubicacion_latitud,
          licitation.ubicacion_longitud
        )
        return dist <= radius
      });

      if(prov){
        filteredLicitations = filteredLicitations.filter(licitation => licitation.provincia == prov)
      }

      res.status(200).json(filteredLicitations);
      return;
    }

    if(product){
      const cached = cache.get(key + product);
      if (cached) {
        res.status(200).json(cached);
        return;
      }
      const licitations = await licitationModel.getAllLicitationsByProduct(product);
      cache.set(key + product, licitations);
      res.status(200).json(licitations);
      return;
    }


    if(filter){
      const licitations = await licitationModel.getAllLicitationsNotFiltered();
      res.status(200).json(licitations);
      return;
    }

    const licitations = await licitationModel.getAllLicitations();

    if (licitations) {
      return res.status(200).json(licitations);
    }

    throw new Error("La obtención de las licitaciones ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationById = async (req, res) => {
  try {
    const {proposals} = req.query;
    if(proposals){
      const licitation = await licitationModel.getFullLicitationById(req.params.id);
      res.status(200).json(licitation);
      return 
    }

    const licitation = await licitationModel.getLicitationById(req.params.id);

    if (licitation) {
      return res.status(200).json(licitation);
    }

    throw new Error("La obtención de las licitaciones ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllLicitationsByProduct = async (req, res) => {
  try {
    const licitations = await licitationModel.getAllLicitationsByProduct(
      req.params.id,
      req.user_id
    );

    if (licitations) {
      return res.status(200).json(licitations);
    }

    throw new Error("La obtención de las licitaciones ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteLicitation = async (req, res) => {
  try {
    const deletedRow = await licitationModel.deleteLicitation(
      req.user_id,
      req.params.id
    );

    if (deletedRow > 0) {
      return res
        .status(200)
        .json({ message: "Licitación eliminada correctamente" });
    }

    throw new Error(
      "La eliminación de la licitacion ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const closeLicitation = async (req, res) => {
  try {
    const closedRow = await licitationModel.closeLicitation(
      req.user_id,
      req.params.id
    );

    if (closedRow > 0) {
      return res
        .status(200)
        .json({ message: "Licitación cerrada correctamente" });
    }

    throw new Error(
      "El cierre de la licitacion ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateParam = async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await qualityParamsModel.updateQualityParam(id, req.body);

    if (affected > 0) {
      return res
        .status(200)
        .json({ message: "Parametro actualizado correctamente" });
    }

    throw new Error("La actualizacion del parametro ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
