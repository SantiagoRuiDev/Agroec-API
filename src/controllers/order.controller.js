import * as notificationService from '../services/notification.service.js';
import * as orderModel from "../models/order.model.js";
import * as profileChecker from "../libs/checker.js";
import { v4 as uuidv4 } from "uuid";

export const getOrdersByUser = async (req, res) => {
  try {
    const user_id = req.user_id;

    const orders = await orderModel.getOrdersByUser(user_id);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    const order_id = req.params.id;

    const order = await orderModel.getOrdersById(order_id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrderDeliveredStatus = async (req, res) => {
  try {
    const order_id = req.params.id;

    const order = await orderModel.createDeliveryStatus(uuidv4(), order_id);

    if (order) {
      return res
        .status(200)
        .json({ message: "La orden se ha marcado como despachada" });
    }

    throw new Error("Un error ha sucedido al intentar cambiar el estado.");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrderReceivedStatus = async (req, res) => {
  try {
    const order_id = req.params.id;

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      if (req.body.cantidad <= 0) {
        throw new Error("Ingresa un valor mayor a 0");
      }

      let order = false;

      if (await orderModel.checkDeliveryStatus(order_id)) {
        order = await orderModel.createReceivedStatus(uuidv4(), order_id);
      } else {
        await orderModel.createDeliveryStatus(uuidv4(), order_id);
        order = await orderModel.createReceivedStatus(uuidv4(), order_id);
      }

      if (order) {
        await orderModel.updateOrderStatus(order_id, "Aceptado");
        await orderModel.updateOrderReceivedQuantity(
          req.body.cantidad,
          order_id
        );
        return res
          .status(200)
          .json({ message: "La orden se ha marcado como recibida" });
      }
    } else {
      const order = await orderModel.createReceivedStatus(uuidv4(), order_id);

      if (order) {
        await orderModel.updateOrderStatus(order_id, "En espera");
        return res
          .status(200)
          .json({ message: "La orden se ha marcado como entregada" });
      }
    }

    throw new Error("Un error ha sucedido al intentar cambiar el estado.");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrderRejectedStatus = async (req, res) => {
  try {
    const order_id = req.params.id;

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      let order = false;

      if (await orderModel.checkDeliveryStatus(order_id)) {
        order = await orderModel.createRejectedStatus(
          uuidv4(),
          order_id,
          req.body.razon
        );
      } else {
        await orderModel.createDeliveryStatus(uuidv4(), order_id);
        order = await orderModel.createRejectedStatus(
          uuidv4(),
          order_id,
          req.body.razon
        );
      }

      const orderDetails = await orderModel.getOrderUsers(order_id);

      if (order) {
        await orderModel.updateOrderStatus(order_id, "Rechazado");

        const notification = await notificationService.createNotification(orderDetails.id_vendedor, orderDetails.id_producto);

        if(notification){
          await notificationService.createOrderNotification(order_id, notification.id);
          const user = await authModel.getAccountById(orderDetails.id_vendedor);
          await notificationService.sendPushNotification("La orden fue rechazada", "El comprador ha rechazado la orden " + String(order_id).slice(0,8), user.id_subscripcion)
        }

        return res
          .status(200)
          .json({ message: "La orden se ha marcado como rechazada" });
      }
    }

    throw new Error("Un error ha sucedido al intentar cambiar el estado.");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getUnpaidOrders = async (req, res) => {
  try {
    const user_id = req.user_id;

    const orders = await orderModel.getUnpaidOrders(user_id);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};