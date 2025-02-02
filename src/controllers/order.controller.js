import * as notificationService from "../services/notification.service.js";
import * as orderModel from "../models/order.model.js";
import * as deliveryModel from "../models/delivery.model.js";
import * as authModel from "../models/auth.model.js";
import * as profileChecker from "../libs/checker.js";
import PDF from "html-pdf";
import { v4 as uuidv4 } from "uuid";
import { getOrderTemplate } from "../pdf_template/order.js";

export const getOrderPDF = async (req, res) => {
  try {
    const order_id = req.params.id;

    const order = await orderModel.getOrdersById(order_id);

    // Opciones de configuración del PDF (puedes ajustar según tus necesidades)
    const options = {
      format: "A4",
      orientation: "portrait",
    };

    // Generar el PDF
    PDF.create(getOrderTemplate(order), options).toBuffer((err, buffer) => {
      if (err) {
        res.status(500).send("Error al generar el PDF");
        return;
      }

      // Enviar el PDF como una respuesta para su descarga
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="documento.pdf"'
      );
      return res.status(200).send(buffer);
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

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

    const order = await orderModel.getOrdersById(order_id, req.user_id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrderShippedStatus = async (req, res) => {
  try {
    const order_id = req.params.id;

    if (!(await orderModel.checkPendingStatus(order_id))) {
      throw new Error("La orden aun no se puede marcar como enviada");
    }

    const order = await orderModel.createShippingStatus(uuidv4(), order_id);

    const orderDetails = await orderModel.getOrderUsers(order_id);
    const notification = await notificationService.createNotification(
      orderDetails.id_comprador,
      orderDetails.id_producto,
      "El vendedor marco la orden como despachada",
      "Orden de " + orderDetails.id_producto,
      "/order/" + order_id // FALTA ID CHAT
    );
    const receptors = await notificationService.getNotificationsReceptors(
      orderDetails.id_comprador
    );
    if (notification) {
      await orderModel.updateOrderStatus(order_id, "En camino");
      await notificationService.sendPushNotification(
        "Tu orden esta en camino",
        "El vendedor marco la orden como despachada",
        receptors,
        "/order/" + order_id // FALTA ID CHAT
      );
    }

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

export const setOrderDeliveredStatus = async (req, res) => {
  try {
    const order_id = req.params.id;

    if (!(await orderModel.checkShippingStatus(order_id))) {
      throw new Error("La orden aun no se puede marcar como entregada");
    }

    const order = await orderModel.createDeliveredStatus(uuidv4(), order_id);

    const orderDetails = await orderModel.getOrderUsers(order_id);
    const notification = await notificationService.createNotification(
      orderDetails.id_comprador,
      orderDetails.id_producto,
      "El vendedor indico que recibiste la orden",
      "Orden de " + orderDetails.id_producto,
      "/order/" + order_id // FALTA ID CHAT
    );

    const receptors = await notificationService.getNotificationsReceptors(
      orderDetails.id_comprador
    );
    if (notification) {
      await orderModel.updateOrderStatus(order_id, "Entregada");
      await notificationService.sendPushNotification(
        "La orden fue entregada",
        "El vendedor indico que recibiste la orden #" +
          String(order_id).slice(0, 8),
        receptors,
        "/order/" + order_id // FALTA ID CHAT
      );
    }

    if (order) {
      return res
        .status(200)
        .json({ message: "La orden se ha marcado como entregada" });
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

      if (!(await orderModel.checkDeliveredStatus(order_id))) {
        throw new Error(
          "Debes esperar al que vendedor indique que recibiste la orden"
        );
      }

      order = await orderModel.createReceivedStatus(uuidv4(), order_id);

      const orderDetails = await orderModel.getOrderUsers(order_id);

      if (order) {
        const notification = await notificationService.createNotification(
          orderDetails.id_vendedor,
          orderDetails.id_producto,
          "El comprador marco la orden como recibida",
          "Orden de " + orderDetails.id_producto,
          "/order/" + order_id // FALTA ID CHAT
        );

        const receptors = await notificationService.getNotificationsReceptors(
          orderDetails.id_vendedor
        );
        if (notification) {
          await notificationService.sendPushNotification(
            "La orden fue recibida",
            "El comprador ha recibido la orden " + String(order_id).slice(0, 8),
            receptors,
            "/order/" + order_id // FALTA ID CHAT
          );
        }
        await orderModel.updateOrderStatus(order_id, "Recibido");
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
        await orderModel.updateOrderStatus(order_id, "Entregada");
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

      if (!(await orderModel.checkDeliveredStatus(order_id))) {
        throw new Error(
          "Debes esperar al que vendedor indique que recibiste la orden"
        );
      }

      order = await orderModel.createRejectedStatus(
        uuidv4(),
        order_id,
        req.body.razon
      );

      const orderDetails = await orderModel.getOrderUsers(order_id);

      if (order) {
        await orderModel.updateOrderStatus(order_id, "Rechazado");

        const notification = await notificationService.createNotification(
          orderDetails.id_vendedor,
          orderDetails.id_producto,
          "El comprador marco la orden como rechazada",
          "Orden de " + orderDetails.id_producto,
          "/order/" + order_id // FALTA ID CHAT
        );

        const receptors = await notificationService.getNotificationsReceptors(
          orderDetails.id_vendedor
        );
        if (notification) {
          await notificationService.sendPushNotification(
            "La orden fue rechazada",
            "El comprador ha rechazado la orden " +
              String(order_id).slice(0, 8),
            receptors,
            "/order/" + order_id // FALTA ID CHAT
          );
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

    if (await profileChecker.isBuyerProfile(user_id)) {
      const orders = await orderModel.getUnpaidOrders(user_id);
      return res.status(200).json(orders);
    } else {
      const orders = await orderModel.getUnpaidOrdersBySeller(user_id);
      return res.status(200).json(orders);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUndeliveredOrders = async (req, res) => {
  try {
    const user_id = req.user_id;

    if (await profileChecker.isBuyerProfile(user_id)) {
      const orders = await orderModel.getUnpaidOrders(user_id);
      return res.status(200).json(orders);
    } else {
      const undeliveredOrders = await orderModel.getOrdersBySellerUndelivered(
        user_id
      );
      return res.status(200).json(undeliveredOrders);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrderDeliveryDate = async (req, res) => {
  try {
    const order_id = req.params.id;

    if (await profileChecker.isBuyerProfile(req.user_id)) {
      let order = true;

      if (!(await orderModel.checkDeliveredStatus(order_id))) {
        throw new Error(
          "Debes esperar al que vendedor indique que recibiste la orden"
        );
      }
      if (await orderModel.checkRevisionStatus(order_id)) {
        throw new Error("Ya has marcado anteriormente un periodo de revisión");
      }

      const orderDetails = await orderModel.getOrderUsers(order_id);

      if (order) {
        await deliveryModel.updateDeliveryDate(order_id, req.body.fecha);
        await orderModel.updateOrderStatus(order_id, "En revision");
        order = await orderModel.createRevisionStatus(uuidv4(), order_id);

        if (order) {
          const notification = await notificationService.createNotification(
            orderDetails.id_vendedor,
            orderDetails.id_producto,
            "El comprador ha recibido la orden y estableció el tiempo de revisión hasta: " +
              req.body.fecha,
            "Orden de " + orderDetails.id_producto,
            "/order/" + order_id // FALTA ID CHAT
          );
          const receptors = await notificationService.getNotificationsReceptors(
            orderDetails.id_vendedor
          );
          if (notification) {
            await notificationService.sendPushNotification(
              "La orden fue recibida",
              "El comprador ha recibido la orden y estableció el tiempo de revisión hasta: " +
                req.body.fecha,
              receptors,
              "/order/" + order_id // FALTA ID CHAT
            );
          }
        }

        return res
          .status(200)
          .json({ message: "La orden se ha marcado en revisión" });
      }
    }

    throw new Error("Un error ha sucedido al intentar cambiar el estado.");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
