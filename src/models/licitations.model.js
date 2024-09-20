import { connection } from "../index.js";

// Modelo de Licitaciones

export const createLicitation = async (
  licitation_id,
  product_id,
  user_id,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO producto_licitar(id, id_producto, id_usuario, precio, precio_unidad, cantidad, cantidad_unidad, presentacion_entrega, valida_hasta, informacion_adicional) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        licitation_id,
        product_id,
        user_id,
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.valida_hasta,
        schema.informacion_adicional,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationsByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pl.*, p.nombre, p.imagen FROM producto_licitar pl INNER JOIN productos p ON p.id = pl.id_producto WHERE id_usuario = ? AND pl.estado != "Eliminada"`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationsByUserAndProduct = async (user_id, product_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pl.*, p.nombre, p.imagen FROM producto_licitar pl 
      INNER JOIN productos p ON p.id = pl.id_producto WHERE id_usuario = ? AND pl.id_producto = ? AND pl.estado != "Eliminada"`,
      [user_id, product_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationById = async (licitation_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pl.*, p.nombre, p.imagen, p.id_producto FROM producto_licitar pl INNER JOIN productos p ON p.id = pl.id_producto WHERE pl.id = ?`,
      [licitation_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLicitations = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM producto_licitar WHERE estado != "Eliminada" LIMIT 30`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLicitationsByProduct = async (product_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM producto_licitar LIMIT 30 WHERE id_producto = ? AND estado != "Eliminada"`,
      [product_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteLicitation = async (user_id, licitation_id) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_licitar SET estado = "Eliminada" WHERE id_usuario = ? AND id = ?`,
      [user_id, licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const closeLicitation = async (user_id, licitation_id) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_licitar SET estado = "Cerrada" WHERE id_usuario = ? AND id = ?`,
      [user_id, licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
