import * as notificationService from "../services/notification.service.js";

export const getNotificationsAndRead = async (req, res) => {
  try {
    const notifications = await notificationService.getNotificationsAndRead(
      req.user_id
    );

    return res.status(200).send(notifications);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setUserOneSignalSubscription = async (req, res) => {
  try {
    const notifications =
      await notificationService.setUserOneSignalSubscription(
        req.user_id,
        req.params.id
      );

    if (notifications > 0) {
      return res
        .status(200)
        .send({ message: "Identificador de subscripcion actualizado" });
    }

    throw new Error("Error al actualizar el identificador de subscripcion");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const setUserOneSignalMobileSuscription = async (req, res) => {
  try {
    const notifications =
      await notificationService.setUserOneSignalMobileSubscription(
        req.user_id,
        req.params.id
      );
      console.log(req.params.id, "Usuario movil ha suscribido a notificaciones")
    if (notifications > 0) {
      return res
        .status(200)
        .send({ message: "Identificador de subscripcion actualizado" });
    }

    throw new Error("Error al actualizar el identificador de subscripcion");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
