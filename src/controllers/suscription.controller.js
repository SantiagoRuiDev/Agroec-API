import * as paymentCore from "../payments/index.js";
import * as suscriptionModel from "../models/suscription.model.js";
import { v4 as uuidv4 } from "uuid";

export const createSuscription = async (req, res) => {
  try {
    const { plan, identificador, documento } = req.body;

    const isSuscribed = await suscriptionModel.getSuscriptionByUser(
      req.user_id
    );

    if (isSuscribed) {
      throw new Error("Ya tienes una suscripción activa");
    }

    const details = await suscriptionModel.getSuscriptionPlanById(plan);

    if (!details) {
      throw new Error("Porfavor, selecciona un plan de suscripción valido");
    }

    const payment = await paymentCore.chargeCard(
      details.valor,
      "Cobro de suscripción recurrente",
      identificador,
      String(documento),
      "MEMBRESIA-" + Math.floor(Math.random() * 99999)
    );

    if (!payment) {
      throw new Error("Error al realizar el cobro de la tarjeta.");
    }

    const limit_date = new Date();
    limit_date.setMonth(limit_date.getMonth() + details.meses); // Sumar los meses del plan
  
    const uuid = uuidv4();

    const suscription = await suscriptionModel.createSuscription(
      uuid,
      plan,
      req.user_id,
      identificador,
      limit_date
    );

    if (suscription == 0) {
      return res.status(404).send({ message: `No fue posible suscribirse` });
    }

    return res
      .status(200)
      .json({ message: `Suscripcion realizada correctamente` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const cancelSuscription = async (req, res) => {
  try {
    const cancelation = await suscriptionModel.cancelSuscription(
      req.user_id
    );

    if(cancelation > 0){
      return res.status(200).json({message: "La suscripción fue cancelada correctamente"});
    }

    throw new Error("No se pudo cancelar la suscripción");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSuscription = async (req, res) => {
  try {
    const suscription = await suscriptionModel.getSuscriptionByUser(
      req.user_id
    );

    return res.status(200).json(suscription);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSuscriptionPlans = async (req, res) => {
  try {
    const plans = await suscriptionModel.getSuscriptionPlans();

    if (!plans) {
      res.status(404).send({ message: "No hay planes para mostrar" });
    }

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
