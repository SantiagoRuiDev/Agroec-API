import { connection } from "../index.js";

export const getPriceAnalyticByProduct = async (product) => {
  try {
    const [statement] = await connection.query(`
      SELECT 
          provincia, 
          MIN(precio) AS precio_minimo,
          MAX(precio) AS precio_maximo
      FROM (
      -- Precios desde producto_licitar
      SELECT 
          pl.precio, 
          u.provincia
      FROM producto_licitar pl
      INNER JOIN usuarios u ON pl.id_usuario = u.id
      INNER JOIN productos p ON pl.id_producto = p.id
      WHERE p.nombre = ?

      UNION ALL

      -- Precios desde producto_vender
      SELECT 
          pv.precio, 
          u.provincia
      FROM producto_vender pv
      INNER JOIN usuarios u ON pv.id_usuario = u.id
      INNER JOIN productos p ON pv.id_producto = p.id
      WHERE p.nombre = ?
    ) AS precios_por_provincia
    GROUP BY provincia
`, [product, product]);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
    const [statement] = await connection.query(
      `SELECT p.*, pf.id as id_preferencia FROM productos p INNER JOIN preferencias pf ON pf.id_producto = p.id WHERE pf.id_usuario = ?`,
      [user_id]
    );

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
