import { connection } from "../index.js";

export const createSuggestion = async (uuid, uuid_user, producto, cantidad) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO sugerir_producto (id, id_usuario, id_producto, cantidad) VALUES (?, ?, ?, ?) `,
      [uuid, uuid_user, producto, cantidad]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSuggestions = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM sugerir_producto`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProducts = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM productos_listados`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const disableProductById = async (id) => {
  try {
    const [statement] = await connection.query(
      `UPDATE productos_listados SET estado = 0 WHERE id = ?`, [id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
