import { connection } from "../index.js";

export const getAllProducts = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM productos`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsByPreferences = async (user_id) => {
  try {
    const [statement] = await connection.query(`SELECT p.*, pf.id as id_preferencia FROM productos p INNER JOIN preferencias pf ON pf.id_producto = p.id WHERE pf.id_usuario = ?`, [user_id]);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO productos (id, nombre, imagen) VALUES (?, ?, ?) `,
      [uuid, schema.nombre, schema.imagen]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      "DELETE FROM productos WHERE id = ?",
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
