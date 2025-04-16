import pool from "../database/index.js";

export const createChat = async (uuid, buyer_id, seller_id, condition_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO chat(id, id_comprador, id_vendedor, id_condiciones) VALUES (?,?,?,?)`,
      [uuid, buyer_id, seller_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getChatById = async (uuid, user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT c.*, cc.id_producto, COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil
        FROM chat c
        INNER JOIN condiciones_compra cc ON cc.id = c.id_condiciones
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = c.id_vendedor
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = c.id_vendedor
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = c.id_vendedor
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = c.id_vendedor
        WHERE c.id = ?
      `,
      [uuid]
    );
    const [messages] = await db.query(
      `SELECT * FROM mensajes m WHERE m.id_chat = ? ORDER BY m.fecha ASC`,
      [statement[0].id]
    );
    const [read] = await db.query(
      `UPDATE mensajes m SET m.leido = 1 WHERE m.id_chat = ? AND m.id_remitente != ?`,
      [statement[0].id, user]
    );
    const [system_read] = await db.query(
      `UPDATE mensajes m SET m.leido = 2 WHERE m.id_remitente = 'Sistema' AND m.id_chat IN (SELECT c.id FROM chat c WHERE c.id_vendedor = ? AND c.id = ?)`,
      [user, statement[0].id]
    );

    return {
      chat: statement[0],
      messages: messages,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getChatByCondition = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM chat c WHERE c.id_condiciones = ?`,
      [uuid]
    );
    const [messages] = await db.query(
      `SELECT * FROM mensajes m WHERE m.id_chat = ?`,
      [statement[0].id]
    );

    return {
      chat: statement[0],
      messages: messages,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const sendMessage = async (uuid, sender_id, chat_id, text) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO mensajes(id, id_remitente, id_chat, texto) VALUES (?,?,?,?)`,
      [uuid, sender_id, chat_id, text]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendSystemMessage = async (uuid, chat_id, text) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO mensajes(id, id_remitente, id_chat, texto) VALUES (?,"Sistema",?,?)`,
      [uuid, chat_id, text]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
