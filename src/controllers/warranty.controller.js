import * as warrantyModel from "../models/warranty.model.js";
import * as walletModel from "../models/wallet.model.js";
import * as profileChecker from "../libs/checker.js";
import * as authModel from "../models/auth.model.js";
import * as notificationService from "../services/notification.service.js";
import * as paymentCore from "../payments/index.js";
import * as orderModel from "../models/order.model.js";
import { v4 as uuidv4 } from "uuid";

export const getWarrantyByUser = async (req, res) => {
  try {
    const user_id = req.user_id;

    if (!(await profileChecker.isBuyerProfile(user_id))) {
      throw new Error("Perfil de tipo invalido, necesitas ser comprador");
    }

    const warranties = await warrantyModel.getWarrantyPayments(user_id);

    const balance = await walletModel.getBalance(user_id);

    if (!warranties) {
      return res
        .status(404)
        .send({ message: "No se pudo obtener las garantias del usuario" });
    }

    return res.status(200).send({ ...balance, warranties: warranties });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createWarranty = async (req, res) => {
  try {
    const user_id = req.user_id;
    const idCondition = req.params.id_condition;
    const uuid = uuidv4();
    const method_payment = req.body.metodo_pago;
    const order_id = req.body.orden;

    if (!(await profileChecker.isBuyerProfile(user_id))) {
      throw new Error("Perfil de tipo inválido, necesitas ser comprador");
    }

    const warrantyExists = await warrantyModel.checkWarrantyExists(idCondition);
    if (warrantyExists) {
      res.status(400).send({ message: "Ya existe un pago para esta garantia" });
      return;
    }

    const paymentCondition = await warrantyModel.getCondition(idCondition);

    if (!paymentCondition) {
      res.status(404).send({
        message: "La condicion de pago no existe o el modo de pago es invalido",
      });
      return;
    }

    const price = paymentCondition.precio;
    const quantity = paymentCondition.cantidad;
    const percentage = paymentCondition.porcentaje_inicial;

    const total = price * quantity * (percentage / 100);

    const payment = await paymentCore.chargeCard(
      total,
      "Pago de Garantia Agroec",
      req.body.identificador,
      String(req.body.documento),
      "GARANTIA-" + Math.floor(Math.random() * 99999)
    );

    if (!payment) {
      throw new Error("Error al realizar el cobro de la tarjeta.");
    }

    const createWarranty = await warrantyModel.createWarranty(
      uuid,
      idCondition,
      method_payment,
      percentage,
      total
    );

    if (!createWarranty) {
      return res
        .status(404)
        .send({ message: "Hubo un error al pagar la garantia" });
    }

    if (createWarranty > 0) {
      const orderData = await orderModel.getOrdersByConditions(idCondition);
      const notification = await notificationService.createNotification(
        orderData[0].id_vendedor,
        orderData[0].id_producto,
        `El comprador ha completado el pago de garantía de $${total.toFixed(
          2
        )}`,
        "Pago de garantía",
        "/order/" + order_id
      );

      const receptors = await notificationService.getNotificationsReceptors(
        orderData[0].id_vendedor
      );
      if (notification) {
        await notificationService.sendPushNotification(
          "Pago de garantía",
          "El comprador ha realizado el pago de $" + total.toFixed(2),
          receptors,
          "/order/" + order_id
        );
      }

      orderData.forEach(async (order) => {
        await orderModel.updateOrderStatus(order.id, "Pendiente de entrega");
        await orderModel.createPendingStatus(uuidv4(), order.id);
      });
      return res.status(200).send({ message: "Garantia pagada exitosamente" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
