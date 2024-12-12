import * as orderModel from "../models/order.model.js";
import * as authModel from "../models/auth.model.js";
import { APP_SETTINGS } from "../libs/config.js";

export const checkPendingOrders = async (req, res, next) => {
  try {
    const { user_id } = req;

    const isBlocked = await authModel.accountIsBlocked(user_id);

    if(isBlocked){
        throw new Error(
          "Tu cuenta esta suspendida, has alcanzado el limite de ordenes sin actualizar estado, porfavor contacta al soporte."
        );
    }

    const today = new Date().toISOString().split("T")[0];
    // Si se encuentran ordenes cuyo estados no haya sido entregado
    // y su fecha de entrega sea anterior a la fecha actual se chequea el limite de estas

    const fetchPendingOrdersBeforeDate =
      await orderModel.getOrdersBySellerUndeliveredBeforeDate(user_id, today);

    if (fetchPendingOrdersBeforeDate.length >= APP_SETTINGS.max_pending_orders) {
      await authModel.setState(user_id, 0);
      throw new Error(
        "Tu cuenta ha sido suspendida, alcanzaste el limite de ordenes sin actualizar estado, porfavor contacta al soporte."
      );
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: error.message, blocked: true });
  }
};

export const checkNotReceivedOrders = async (req, res, next) => {
  try {
    const { user_id } = req;

    const isBlocked = await authModel.accountIsBlocked(user_id);

    if(isBlocked){
        throw new Error(
          "Tu cuenta esta suspendida, has alcanzado el limite de ordenes sin confirmar recepción, porfavor contacta al soporte."
        );
    }

    const today = new Date().toISOString().split("T")[0];
    // Si se encuentran ordenes cuyo estado no ha sido recibido aceptado y la fecha entrega se haya excedido.

    const fetchUndeliveredOrders =
      await orderModel.getOrdersByBuyerNotReceivedBeforeDate(user_id, today);

    if (fetchUndeliveredOrders.length >= APP_SETTINGS.max_unreceived_orders) {
      await authModel.setState(user_id, 0);
      throw new Error(
        "Tu cuenta ha sido suspendida, alcanzaste el limite de ordenes sin confirmar recepción, porfavor contacta al soporte."
      );
    }

    next();
  } catch (error) {
    return res.status(403).json({ error: error.message, blocked: true });
  }
};
