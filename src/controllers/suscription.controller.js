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

export const createSuscriptionByAdmin = async (req, res) => {
  try {
    const { id_plan, estado, id_usuario } = req.body;

    const isSuscribed = await suscriptionModel.getSuscriptionByUser(id_usuario);

    if (isSuscribed) {
      throw new Error("Este usuario ya tiene una suscripción activa");
    }

    const details = await suscriptionModel.getSuscriptionPlanById(id_plan);

    if (!details) {
      throw new Error("Porfavor, selecciona un plan de suscripción valido");
    }

    const limit_date = new Date();
    limit_date.setMonth(limit_date.getMonth() + details.meses); // Sumar los meses del plan

    const uuid = uuidv4();

    const suscription = await suscriptionModel.createSuscription(
      uuid,
      id_plan,
      id_usuario,
      "Sistema",
      limit_date,
      estado
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

export const createSuscriptionPlan = async (req, res) => {
  try {
    const { nombre, meses, valor } = req.body;

    if (meses == 0) {
      throw new Error("Ingresa una cantidad de meses validos");
    }
    if (valor == 0) {
      throw new Error("Ingresa un valor valido");
    }
    if (nombre == "" || nombre == undefined) {
      throw new Error("Ingresa un nombre valido");
    }

    const uuid = uuidv4();

    const plan = await suscriptionModel.createSuscriptionPlan(
      uuid,
      nombre,
      meses,
      valor
    );

    if (plan == 0) {
      return res
        .status(404)
        .send({ message: `No fue posible crear este plan` });
    }

    return res.status(200).json({ message: `Plan añadido correctamente` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const updatePlanStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const planExist = await suscriptionModel.getSuscriptionPlanById(id);

    if (planExist) {
      const newState = planExist.estado == 1 ? 0 : 1;
      await suscriptionModel.updatePlanStatus(id, newState);
      return res.status(200).json({ message: `El estado del plan ha sido modificado` });
    }else {
      throw new Error("Este plan no existe");
    }
    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSuscriptionPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const planHaveActiveSubs = await suscriptionModel.getSuscriptionByPlan(id);

    if (planHaveActiveSubs.length > 0) {
      await suscriptionModel.updatePlanStatus(0, id);
      return res.status(200).json({ message: `Existen suscripciones activas: Plan desactivado` });
    }

    const deletedRow = await suscriptionModel.deleteSuscriptionPlan(id);

    if (deletedRow == 0) {
      return res
        .status(404)
        .send({ message: `No fue posible eliminar este plan` });
    }

    return res.status(200).json({ message: `Plan eliminado correctamente` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const cancelSuscription = async (req, res) => {
  try {
    const cancelation = await suscriptionModel.cancelSuscription(req.user_id);

    if (cancelation > 0) {
      return res
        .status(200)
        .json({ message: "La suscripción fue cancelada correctamente" });
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
    if (req.user_id == "Sistema") {
      const plans = await suscriptionModel.getSuscriptionPlansRaw();
      if (!plans) {
        res.status(404).send({ message: "No hay planes para mostrar" });
      }
      return res.status(200).json(plans);
    } else {
      const plans = await suscriptionModel.getSuscriptionPlans();
      if (!plans) {
        res.status(404).send({ message: "No hay planes para mostrar" });
      }
      return res.status(200).json(plans);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
