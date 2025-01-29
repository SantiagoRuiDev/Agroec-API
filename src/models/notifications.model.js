import { connection } from "../index.js";

export const createNotification = async (
  uuid_notification,
  uuid_user,
  uuid_product,
  message,
  title,
  redirection
) => {
  try {
    const [insert] = await connection.query(
      `INSERT INTO notificaciones
      (id, id_notificado, id_producto, mensaje, titulo, redireccion) 
      VALUES(?,?,?,?,?,?)`,
      [uuid_notification, uuid_user, uuid_product, message, title, redirection]
    );

    return insert.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUnreadedNotifications = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      "SELECT * FROM notificaciones WHERE vista = 0 AND id_notificado = ?",
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getNotifications = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `
      SELECT *
      FROM notificaciones
      WHERE id_notificado = ? ORDER BY fecha DESC`,
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markNotificationsAsRead = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      "UPDATE notificaciones SET vista = 1 WHERE id_notificado = ? AND vista = 0",
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const setUserOneSignalMobileSubscription = async (uuid_user, uuid_subscription) => {
  try {
    const [statement] = await connection.query(
      "UPDATE usuarios SET id_subscripcion_movil = ? WHERE id = ?",
      [uuid_subscription, uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setUserOneSignalSubscription = async (uuid_user, uuid_subscription) => {
  try {
    const [statement] = await connection.query(
      "UPDATE usuarios SET id_subscripcion = ? WHERE id = ?",
      [uuid_subscription, uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};