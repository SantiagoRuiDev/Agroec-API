import * as salesModel from "../models/sale.model.js";
import * as proposalModel from "../models/proposal.model.js";
import * as licitationModel from "../models/licitations.model.js";
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
        contidion_id
      );
      if (insertCondition > 0) {
        await proposalModel.createSaleCondition(
          uuidv4(),
          proposal_id,
          contidion_id
        );

        await chatModel.createChat(uuidv4(), fetchLicitation.id_usuario, user_id, contidion_id);
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

export const declineSaleProposal = async (req, res) => {
  try {
    if (await profileChecker.isBuyerProfile(req.user_id)) {
      await proposalModel.updateSaleProposalStateByBuyer(
        req.params.id,
        "Rechazada"
      );
    } else {
      await proposalModel.updateSaleProposalStateBySeller(
        req.params.id,
        "Rechazada"
      );
    }

    return res
      .status(200)
      .json({ message: "Propuesta rechazada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const acceptSaleProposal = async (req, res) => {
  try {
    // Si la propuesta esta aceptada por ambas partes, enviar orden:
    let proposal = await proposalModel.getSaleProposalById(req.params.id);

    if (!proposal[0]) {
      throw new Error("Propuesta inexistente");
    }

    if (proposal[0].estado_comprador == proposal[0].estado_vendedor) {
      throw new Error("Esta propuesta ya esta aceptada");
    }

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      await proposalModel.updateSaleProposalStateByBuyer(
        req.params.id,
        "Aceptada"
      );
    } else {
      await proposalModel.updateSaleProposalStateBySeller(
        req.params.id,
        "Aceptada"
      );
    }

    proposal = await proposalModel.getSaleProposalById(req.params.id);

    if (proposal[0].estado_comprador == proposal[0].estado_vendedor) {
      // Si ambos estados son iguales
      const delivery = await proposalModel.getSaleDeliveryWithConditionsById(
        req.params.id
      ); // Consigo las entregas marcadas en condiciones

      for (const order of delivery) {
        // Por cada entrega creo una orden.
        await orderModel.createOrder(
          uuidv4(),
          proposal[0].id_comprador,
          proposal[0].id_vendedor,
          order.id
        );
      }

      return res
        .status(200)
        .json({
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
        contidion_id
      );
      if (insertCondition > 0) {
        await proposalModel.createLicitationCondition(
          uuidv4(),
          proposal_id,
          contidion_id
        );
        
        await chatModel.createChat(uuidv4(), user_id, fetchSale.id_usuario, contidion_id);
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

export const declineLicitationProposal = async (req, res) => {
  try {
    if (await profileChecker.isBuyerProfile(req.user_id)) {
      await proposalModel.updateLicitationProposalStateByBuyer(
        req.params.id,
        "Rechazada"
      );
    } else {
      await proposalModel.updateLicitationProposalStateBySeller(
        req.params.id,
        "Rechazada"
      );
    }

    return res
      .status(200)
      .json({ message: "Propuesta rechazada correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const acceptLicitationProposal = async (req, res) => {
  try {
    let proposal = await proposalModel.getLicitationProposalById(req.params.id);

    if (!proposal[0]) {
      throw new Error("Propuesta inexistente");
    }

    if (proposal[0].estado_comprador == proposal[0].estado_vendedor) {
      throw new Error("Esta propuesta ya esta aceptada");
    }

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      await proposalModel.updateLicitationProposalStateByBuyer(
        req.params.id,
        "Aceptada"
      );
    } else {
      await proposalModel.updateLicitationProposalStateBySeller(
        req.params.id,
        "Aceptada"
      );
    }

    proposal = await proposalModel.getLicitationProposalById(req.params.id);

    if (proposal[0].estado_comprador == proposal[0].estado_vendedor) {
      // Si ambos estados son iguales
      const delivery = await proposalModel.getLicitationDeliveryWithConditionsById(
        req.params.id
      ); // Consigo las entregas marcadas en condiciones

      for (const order of delivery) {
        // Por cada entrega creo una orden.
        await orderModel.createOrder(
          uuidv4(),
          proposal[0].id_comprador,
          proposal[0].id_vendedor,
          order.id
        );
      }

      return res
        .status(200)
        .json({
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

export const updateCondition = async (req, res) => {
  try {
    const condition_id = req.params.id;
    const condition_schema = req.body.condition;
    const delivery_schema = req.body.delivery;
    const warranty_schema = req.body.warranty;

    if (condition_schema.modo_pago == "Modo Garantía") {
      if (!warranty_schema) {
        throw new Error(
          "Si pagaras en garantía necesitas ingresar los porcentajes"
        );
      }
    }

    const updateRow = await conditionModel.updateCondition(
      condition_id,
      condition_schema
    );

    if (updateRow > 0) {
      if (delivery_schema) {
        for (const delivery of delivery_schema) {
          await deliveryModel.createDelivery(
            uuidv4(),
            delivery.id_punto,
            condition_id,
            delivery
          );
        }
      }

      if (warranty_schema) {
        await conditionModel.updateConditionWarranty(
          condition_id,
          warranty_schema
        );
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
