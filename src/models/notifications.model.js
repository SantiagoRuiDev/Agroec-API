import { connection } from "../index.js";

export const createNotificationReceptor = async (
  uuid,
  uuid_user,
  uuid_onesignal
) => {
  try {
    const [receptorExist] = await connection.query(
      `SELECT * FROM notificaciones_receptores WHERE id_usuario = ? AND id_onesignal = ?`,
      [uuid_user, uuid_onesignal]
    );
    if(receptorExist.length > 0){
      return 2;
    }

    const [insert] = await connection.query(
      `INSERT INTO notificaciones_receptores
      (id, id_usuario, id_onesignal) 
      VALUES(?,?,?)`,
      [uuid, uuid_user, uuid_onesignal]
    );

    return insert.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getReceptorsByUser = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `
      SELECT id_onesignal
      FROM notificaciones_receptores
      WHERE id_usuario = ?`,
      [uuid_user]
    );

    return statement.map(row => {
      return row.id_onesignal;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const deleteNotificationReceptor = async (uuid_user, uuid_receptor) => {
  try {
    const [statement] = await connection.query(
      "DELETE FROM notificaciones_receptores WHERE id_usuario = ? AND id_onesignal = ?",
      [uuid_user, uuid_receptor]
    );

    return statement.affectedRows;
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