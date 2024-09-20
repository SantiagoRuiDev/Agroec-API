import * as salesModel from "../models/sale.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as licitationModel from "../models/licitations.model.js";
import * as qualityParamsModel from "../models/qualityParams.model.js";
import * as conditionModel from "../models/condition.model.js";
import * as deliveryModel from "../models/delivery.model.js";
import * as profileChecker from "../libs/checker.js";
import * as orderModel from "../models/order.model.js";
import * as chatModel from "../models/chat.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSaleProposal = async (req, res) => {
  try {
    const licitation_id = req.params.id;
    const user_id = req.user_id;
    const proposal_id = uuidv4();
    const contidion_id = uuidv4();

    if (await profileChecker.isBuyerProfile(user_id)) {
      throw new Error("Solo los vendedores pueden hacer propuestas de venta.");
    }

    const fetchLicitation = await licitationModel.getLicitationById(
      licitation_id
    );

    if (!fetchLicitation) {
      throw new Error("Esta licitacion no existe");
    }

    if (fetchLicitation.id_usuario == user_id) {
      throw new Error("No puedes crear una oferta de venta a ti mismo");
    }

    const insertProposal = await proposalModel.createSaleProposal(
      proposal_id,
      licitation_id,
      user_id,
      req.body
    );

    if (insertProposal > 0) {
      const insertCondition = await conditionModel.createContidion(
        contidion_id,
        fetchLicitation.id_producto
      );
      if (insertCondition > 0) {
        await proposalModel.createSaleCondition(
          uuidv4(),
          proposal_id,
          contidion_id
        );

        await chatModel.createChat(
          uuidv4(),
          fetchLicitation.id_usuario,
          user_id,
          contidion_id
        );
      }

      return res
        .status(200)
        .send({ message: `Oferta de venta realizada con exito` });
    }

    throw new Error(
      "La creacion de la oferta de venta ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSaleProposalById = async (req, res) => {
  try {
    const proposal = await proposalModel.getSaleProposalById(req.params.id);

    if (proposal) {
      return res.status(200).json(proposal);
    }

    throw new Error("La obtención de la oferta de venta ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSaleProposalByUser = async (req, res) => {
  try {
    const userProposals = await proposalModel.getSaleProposalByUser(
      req.user_id
    );

    if (userProposals) {
      return res.status(200).json(userProposals);
    }

    throw new Error("La obtención de las ofertas de venta ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSaleProposalByUserAndProduct = async (req, res) => {
  try {
    const proposals = await proposalModel.getSaleProposalByUserAndProduct(
      req.user_id,
      req.params.id
    );

    if (proposals) {
      return res.status(200).json(proposals);
    }

    throw new Error("La obtención de las ofertas de venta ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Propuestas de Compras a Ventas

export const createLicitationProposal = async (req, res) => {
  try {
    const sale_id = req.params.id;
    const user_id = req.user_id;
    const proposal_id = uuidv4();
    const contidion_id = uuidv4();

    const fetchSale = await salesModel.getSalesById(sale_id);

    if (!(await profileChecker.isBuyerProfile(user_id))) {
      throw new Error(
        "Solo los compradores pueden hacer propuestas de compra."
      );
    }

    if (!fetchSale) {
      throw new Error("Esta venta no existe");
    }

    if (fetchSale.id_usuario == user_id) {
      throw new Error("No puedes crear una oferta de compra a ti mismo");
    }

    const insertProposal = await proposalModel.createLicitationProposal(
      proposal_id,
      sale_id,
      user_id,
      req.body
    );

    if (insertProposal > 0) {
      const insertCondition = await conditionModel.createContidion(
        contidion_id,
        fetchSale.id_producto
      );
      if (insertCondition > 0) {
        await proposalModel.createLicitationCondition(
          uuidv4(),
          proposal_id,
          contidion_id
        );

        await chatModel.createChat(
          uuidv4(),
          user_id,
          fetchSale.id_usuario,
          contidion_id
        );
      }
      return res
        .status(200)
        .send({ message: `Oferta de compra realizada con exito` });
    }

    throw new Error(
      "La creacion de la oferta de compra ha fallado, intenta nuevamente"
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationProposalById = async (req, res) => {
  try {
    const proposal = await proposalModel.getLicitationProposalById(
      req.params.id
    );

    if (proposal) {
      return res.status(200).json(proposal);
    }

    throw new Error("La obtención de la oferta de compra ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationProposalByUserAndProduct = async (req, res) => {
  try {
    const proposals = await proposalModel.getLicitationProposalByUserAndProduct(
      req.user_id,
      req.params.id
    );

    if (proposals) {
      return res.status(200).json(proposals);
    }

    throw new Error("La obtención de las ofertas de compra ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getLicitationProposalByUser = async (req, res) => {
  try {
    const userProposals = await proposalModel.getLicitationProposalByUser(
      req.user_id
    );

    if (userProposals) {
      return res.status(200).json(userProposals);
    }

    throw new Error("La obtención de las ofertas de compra ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCondition = async (req, res) => {
  try {
    const user_id = req.user_id;
    const condition_id = req.params.id;
    const condition_schema = req.body.condition;
    const delivery_schema = req.body.delivery;
    const quality_params = req.body.quality_params;

    if (condition_schema.modo_pago == "Modo Garantía") {
      if (
        condition_schema.porcentaje_inicial == 0 ||
        condition_schema.porcentaje_final == 0
      ) {
        throw new Error(
          "En modo garantia, los porcentajes deben ser mayores a 0."
        );
      }
    }

    const updateRow = await conditionModel.updateCondition(
      condition_id,
      condition_schema
    );

    if (updateRow > 0) {
      if (quality_params) {
        for (const param of req.body.quality_params) {
          if (param.id == "") {
            const newParamRowId = uuidv4();
            await qualityParamsModel.createQualityParam(
              newParamRowId,
              user_id,
              param
            );
            await qualityParamsModel.createQualityParamForCondition(
              uuidv4(),
              newParamRowId,
              condition_id
            );
          } else {
            continue;
          }
        }
      }

      if (delivery_schema) {
        for (const delivery of delivery_schema) {
          if (delivery.id == "") {
            await deliveryModel.createDelivery(
              uuidv4(),
              delivery.punto.id,
              condition_id,
              delivery
            );
          } else {
            continue;
          }
        }
      }

      if (condition_schema.modo_pago == "Modo Garantía") {
        await conditionModel.updateConditionWarranty(condition_id, {
          modo_pago_final: condition_schema.modo_pago_final,
          porcentaje_inicial: condition_schema.porcentaje_inicial,
          porcentaje_final: condition_schema.porcentaje_final,
        });
      }

      return res
        .status(200)
        .send({ message: `Condición actualizada con exito` });
    }

    throw new Error("No se pudo actualizar esta condición de compra");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Esta funcion acepta una propuesta por condiciones, es decir busca a partir de una condicion una propuesta, de venta o compra y la acepta
export const acceptProposalByConditions = async (req, res) => {
  try {
    let proposal = await proposalModel.getProposalByConditions(req.params.id);

    if (proposal == undefined) {
      throw new Error("Propuesta inexistente");
    }

    if (
      proposal.proposal.estado_comprador == "Aceptada" &&
      proposal.proposal.estado_vendedor == "Aceptada"
    ) {
      throw new Error("Esta propuesta ya esta aceptada");
    }

    if (
      proposal.proposal.estado_comprador == "Rechazada" ||
      proposal.proposal.estado_vendedor == "Rechazada"
    ) {
      throw new Error("Esta propuesta ya esta rechazada");
    }

    const conditions = await conditionModel.getConditionById(req.params.id);

    const deliveries = await conditionModel.getDeliveriesByCondition(
      req.params.id
    ); // Consigo las entregas marcadas en condiciones

    if (deliveries.length == 0) {
      throw new Error("Define al menos una entrega");
    }

    if (conditions.precio <= 0) {
      throw new Error("El precio en las condiciones debe ser mayor a 0");
    }
    if (conditions.cantidad <= 0) {
      throw new Error(
        "La cantidad negociada en las condiciones debe ser mayor a 0"
      );
    }
    if (conditions.modo_pago == "Modo Garantia") {
      if (conditions.porcentaje_inicial <= 0) {
        throw new Error("El porcentaje inicial debe ser mayor a 0");
      }
      if (conditions.porcentaje_inicial + conditions.porcentaje_final > 100) {
        throw new Error("La suma de ambos porcentajes no debe superar 100");
      }
    }

    if (
      (await profileChecker.isBuyerProfile(req.user_id)) &&
      proposal.type == "Sale"
    ) {
      await proposalModel.updateSaleProposalStateByBuyer(
        proposal.proposal.id,
        "Aceptada"
      );
    } else {
      await proposalModel.updateSaleProposalStateBySeller(
        proposal.proposal.id,
        "Aceptada"
      );
    }

    if (
      (await profileChecker.isBuyerProfile(req.user_id)) &&
      proposal.type == "Licitation"
    ) {
      await proposalModel.updateLicitationProposalStateByBuyer(
        proposal.proposal.id,
        "Aceptada"
      );
    } else {
      await proposalModel.updateLicitationProposalStateBySeller(
        proposal.proposal.id,
        "Aceptada"
      );
    }

    proposal = await proposalModel.getProposalByConditions(req.params.id);

    if (
      proposal.proposal.estado_comprador == "Aceptada" &&
      proposal.proposal.estado_vendedor == "Aceptada"
    ) {
      // Si ambos estados son iguales
      const delivery = await conditionModel.getDeliveriesByCondition(
        req.params.id
      ); // Consigo las entregas marcadas en condiciones

      for (const order of delivery) {
        // Por cada entrega creo una orden.
        await orderModel.createOrder(
          uuidv4(),
          proposal.proposal.id_comprador,
          proposal.proposal.id_vendedor,
          order.id
        );
      }

      return res.status(200).json({
        message: "Propuesta aceptada correctamente, se ha creado la orden/es",
      });
    }

    return res
      .status(200)
      .json({ message: "Propuesta aceptada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await orderModel.deleteDelivery(id);

    if (affected) {
      return res
        .status(200)
        .json({ message: "Entrega eliminada correctamente" });
    }

    throw new Error("La eliminación de la entrega ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteParam = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user_id;

    const affected = await qualityParamsModel.deleteQualityParamForCondition(
      id
    );

    if (affected) {
      await qualityParamsModel.deleteQualityParam(id, user_id);

      return res
        .status(200)
        .json({ message: "Parametro de calidad elimiando correctamente" });
    }

    throw new Error("La eliminación del parametro ha fallado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await deliveryModel.updateDelivery(id, req.body);

    if (affected > 0) {
      return res
        .status(200)
        .json({ message: "Entrega actualizada correctamente" });
    }

    throw new Error("La actualizacion de la entrega ha fallado");
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
