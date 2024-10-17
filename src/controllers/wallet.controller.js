import * as walletModel from "../models/wallet.model.js";
import * as deliveryModel from "../models/delivery.model.js";
import * as notificationService from "../services/notification.service.js";
import * as orderModel from "../models/order.model.js";
import * as authModel from "../models/auth.model.js";
import { v4 as uuidv4 } from "uuid";

export const createWallet = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;

    const createWallet = await walletModel.createWallet(table_id, user_id);

    if (!createWallet) {
      res.status(404).send({ message: "Hubo un error al crear la billetera" });
    }

    res.status(200).send({ message: "Billetera creada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const rechargeWallet = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;
    const rechargeSchema = req.body;

    const { wallet } = await walletModel.getWalletByUser(user_id);

    const idWallet = wallet?.id;

    if (!idWallet) {
      return res
        .status(404)
        .send({ message: `La billetera con id: ${idWallet} no existe` });
    }

    const balanceNow = wallet?.saldo;

    const rechargeAmount = rechargeSchema.monto_recarga;

    const rechargeMoreBalance = balanceNow + rechargeAmount;

    const rechargeResult = await walletModel.rechargeWallet(
      table_id,
      idWallet,
      rechargeSchema,
      rechargeAmount
    );

    if (!rechargeResult) {
      return res
        .status(404)
        .send({ message: "Hubo un error al recargar la billetera" });
    }

    await walletModel.updateBalance(idWallet, rechargeMoreBalance);

    return res
      .status(200)
      .send({ message: "Billetera recargada exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createFee = async (req, res) => {
  try {
    const table_id = uuidv4();
    const user_id = req.user_id;
    const id_delivery = req.params.id_entrega;
    const feeSchema = req.body;

    const { wallet } = await walletModel.getWalletByUser(user_id);

    const idWallet = wallet?.id;

    if (!idWallet) {
      return res
        .status(404)
        .send({ message: `La billetera con id: ${idWallet} no existe` });
    }

    const balanceNow = wallet?.saldo;

    const feeBalance = feeSchema.monto_fee;

    if (balanceNow < feeBalance) {
      return res
        .status(404)
        .send({ message: "El saldo debe ser mayor al monto para cobrar" });
    }

    const balanceLessFee = balanceNow - feeBalance;

    const createFee = await walletModel.createFee(
      table_id,
      id_delivery,
      idWallet,
      feeSchema
    );

    if (!createFee) {
      return res.status(404).send({ message: "Error al procesar el cobro" });
    }

    const orderDetails = await deliveryModel.getDeliveryById(id_delivery);
    const notified_id = (orderDetails.id_comprador == user_id) ? orderDetails.id_vendedor : orderDetails.id_comprador;
    const notification = await notificationService.createNotification(
      notified_id,
      orderDetails.id_producto
    );

    if (notification) {
      await notificationService.createOrderNotification(
        orderDetails.id,
        notification.id,
        "Pago de fee Agroec completado"
      );
      const user = await authModel.getAccountById(notified_id);
      await notificationService.sendPushNotification(
        "Pago de fee Agroec",
        "El usuario pago el fee de la orden " +
          String(orderDetails.id).slice(0, 8),
        user.id_subscripcion
      );
    }

    await walletModel.updateBalance(idWallet, balanceLessFee);

    return res.status(200).send({ message: "Cobro realizado exitosamente" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getWalletByUser = async (req, res) => {
  const user_id = req.user_id;

  const allWallet = await walletModel.getWalletByUser(user_id);

  if (!allWallet) {
    res
      .status(404)
      .send({ message: "Error al obtener la billetera del usuario" });
  }

  return res.status(200).send(allWallet);
};
