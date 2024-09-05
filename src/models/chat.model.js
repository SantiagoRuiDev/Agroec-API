import { connection } from "../index.js";

export const createChat = async (uuid, buyer_id, seller_id, condition_id) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO chat(id, id_comprador, id_vendedor, id_condiciones) VALUES (?,?,?,?)`,
      [uuid, buyer_id, seller_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getChatByCondition = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM chat c WHERE c.id_condiciones = ?`,
      [uuid]
    );
    const [messages] = await connection.query(
      `SELECT * FROM mensajes m WHERE m.id_chat = ?`,
      [statement[0].id]
    );

    return {
      chat: statement[0],
      messages: messages,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendMessage = async (uuid, sender_id, chat_id, text) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO mensajes(id, id_remitente, id_chat, texto) VALUES (?,?,?,?)`,
      [uuid, sender_id, chat_id, text]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
