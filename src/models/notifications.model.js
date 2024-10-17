import { connection } from "../index.js";

export const createNotification = async (
  uuid_notification,
  uuid_user,
  uuid_product
) => {
  try {
    const [insert] = await connection.query(
      `INSERT INTO notificaciones
      (id, id_notificado, id_producto) 
      VALUES(?,?,?)`,
      [uuid_notification, uuid_user, uuid_product]
    );

    let statement = null;
    if (insert.affectedRows > 0) {
      [statement] = await connection.query(
        "SELECT * FROM notificaciones WHERE id = ?",
        [uuid_notification]
      );
    }

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createOrderNotification = async (
  uuid,
  uuid_notification,
  uuid_order,
  message
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO notificaciones_ordenes
        (id, id_notificacion, id_orden, mensaje) 
        VALUES(?,?,?,?)`,
      [uuid, uuid_notification, uuid_order, message]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const createChatNotification = async (
  uuid,
  uuid_notification,
  uuid_chat,
  message
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO notificaciones_chat
        (id, id_notificacion, id_chat, mensaje) 
        VALUES(?,?,?,?)`,
      [uuid, uuid_notification, uuid_chat, message]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const createWarrantyNotification = async (
  uuid,
  uuid_notification,
  uuid_warranty,
  message
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO notificaciones_garantias
        (id, id_notificacion, id_garantia, mensaje) 
        VALUES(?,?,?,?)`,
      [uuid, uuid_notification, uuid_warranty, message]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSaleProposalNotification = async (
  uuid,
  uuid_notification,
  uuid_sale,
  message
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO notificaciones_propuesta_venta
        (id, id_notificacion, id_propuesta, mensaje) 
        VALUES(?,?,?,?)`,
      [uuid, uuid_notification, uuid_sale, message]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createLicitationProposalNotification = async (
  uuid,
  uuid_notification,
  uuid_licitation,
  message
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO notificaciones_propuesta_compra
        (id, id_notificacion, id_propuesta, mensaje) 
        VALUES(?,?,?,?)`,
      [uuid, uuid_notification, uuid_licitation, message]
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
      SELECT n.*, COALESCE(nc.mensaje, no.mensaje, npv.mensaje, npc.mensaje, ng.mensaje) AS mensaje,
      CASE 
          WHEN nc.mensaje IS NOT NULL THEN 'Chat'
          WHEN no.mensaje IS NOT NULL THEN 'Orden'
          WHEN npv.mensaje IS NOT NULL THEN 'Propuesta Venta'
          WHEN npc.mensaje IS NOT NULL THEN 'Propuesta Compra'
          WHEN ng.mensaje IS NOT NULL THEN 'Garantía'
      END AS tipo_notificacion,
      CASE 
          WHEN nc.mensaje IS NOT NULL THEN nc.id_chat
          WHEN no.mensaje IS NOT NULL THEN no.id_orden
          WHEN npv.mensaje IS NOT NULL THEN npv.id_propuesta
          WHEN npc.mensaje IS NOT NULL THEN npc.id_propuesta
          WHEN ng.mensaje IS NOT NULL THEN ng.id_garantia
      END AS id_redireccion
      FROM notificaciones n
      LEFT JOIN notificaciones_chat nc ON nc.id_notificacion = n.id
      LEFT JOIN notificaciones_ordenes no ON no.id_notificacion = n.id
      LEFT JOIN notificaciones_propuesta_venta npv ON npv.id_notificacion = n.id
      LEFT JOIN notificaciones_propuesta_compra npc ON npc.id_notificacion = n.id
      LEFT JOIN notificaciones_garantias ng ON ng.id_notificacion = n.id
      WHERE id_notificado = ? ORDER BY fecha ASC`,
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