import * as walletModel from "../models/wallet.model.js";
import * as paymentsModel from "../models/payments.model.js";
import { v4 as uuidv4 } from "uuid";

export const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await paymentsModel.getPaymentsByUser(req.params.id);
    return res.status(200).send(payments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPaymentsByLoggedUser = async (req, res) => {
  try {
    const payments = await paymentsModel.getPaymentsByUser(req.user_id);
    const balance = await walletModel.getBalance(req.user_id);
    return res.status(200).send({saldo: balance.saldo, payments: payments});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePaymentById = async (req, res) => {
  try {
    const deletedRow = await paymentsModel.deletePaymentById(req.params.id);
    if (deletedRow > 0) {
      return res
        .status(200)
        .send({ message: "Pago de garantia eliminado correctamente" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createPaymentByUser = async (req, res) => {
  try {
    const schema = req.body;
    const user_id = req.params.id;

    if (!schema.code || !schema.date) {
      throw new Error("Porfavor ingresa los campos codigo y fecha");
    }
    
    const paymentExist = await paymentsModel.getPaymentsByOrderId(req.body.id_orden);

    if(paymentExist){
      throw new Error("El pago de la garantia de esta orden ya ha sido realizado al vendedor");
    }

    await paymentsModel.createPaymentByUser(uuidv4(), req.body.id_orden, user_id, schema);

    return res
      .status(200)
      .send({ message: "Pago de garantia creado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
