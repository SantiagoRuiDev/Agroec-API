import pool from "../database/index.js";

export const createNotificationReceptor = async (
  uuid,
  uuid_user,
  uuid_onesignal
) => {
  const db = await pool.getConnection();
  try {
    const [receptorExist] = await db.query(
      `SELECT * FROM notificaciones_receptores WHERE id_usuario = ? AND id_onesignal = ?`,
      [uuid_user, uuid_onesignal]
    );
    if(receptorExist.length > 0){
      return 2;
    }

    const [insert] = await db.query(
      `INSERT INTO notificaciones_receptores
      (id, id_usuario, id_onesignal) 
      VALUES(?,?,?)`,
      [uuid, uuid_user, uuid_onesignal]
    );

    return insert.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getReceptorsByUser = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
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
  } finally {
    db.release(); // Muy importante
  }
};

export const getReceptorsByBuyerProfile = async () => {
  const db = await pool.getConnection();
  try {
    const [usersIds] = await db.query(
      `SELECT id_usuario FROM perfil_comprador`
    );

    const mappedIds = usersIds.map(row => row.id_usuario)
    
    const [statement] = await db.query(
      `SELECT id_onesignal
      FROM notificaciones_receptores
      WHERE id_usuario IN (?)`, [mappedIds]
    );

    return statement.map(row => {
      return row.id_onesignal;
    });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getReceptoresBySellerProfile = async () => {
  const db = await pool.getConnection();
  try {
    const [usersIds] = await db.query(
      `SELECT id_usuario FROM perfil_agricultor
      UNION
      SELECT id_usuario FROM perfil_comerciante
      UNION
      SELECT id_usuario FROM perfil_comerciante_agroquimicos
      UNION
      SELECT id_usuario FROM perfil_asociacion_agricola`
    );

    const mappedIds = usersIds.map(row => row.id_usuario)
    
    const [statement] = await db.query(
      `SELECT id_onesignal
      FROM notificaciones_receptores
      WHERE id_usuario IN (?)`, [mappedIds]
    );

    return statement.map(row => {
      return row.id_onesignal;
    });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
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
  const db = await pool.getConnection();
  try {
    const [insert] = await db.query(
      `INSERT INTO notificaciones
      (id, id_notificado, id_producto, mensaje, titulo, redireccion) 
      VALUES(?,?,?,?,?,?)`,
      [uuid_notification, uuid_user, uuid_product, message, title, redirection]
    );

    return insert.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteNotificationReceptor = async (uuid_user, uuid_receptor) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "DELETE FROM notificaciones_receptores WHERE id_usuario = ? AND id_onesignal = ?",
      [uuid_user, uuid_receptor]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getUnreadedNotifications = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "SELECT * FROM notificaciones WHERE vista = 0 AND id_notificado = ?",
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getNotifications = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `
      SELECT *
      FROM notificaciones
      WHERE id_notificado = ? ORDER BY fecha DESC`,
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const markNotificationsAsRead = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE notificaciones SET vista = 1 WHERE id_notificado = ? AND vista = 0",
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const setUserOneSignalMobileSubscription = async (uuid_user, uuid_subscription) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE usuarios SET id_subscripcion_movil = ? WHERE id = ?",
      [uuid_subscription, uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const setUserOneSignalSubscription = async (uuid_user, uuid_subscription) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE usuarios SET id_subscripcion = ? WHERE id = ?",
      [uuid_subscription, uuid_user]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};