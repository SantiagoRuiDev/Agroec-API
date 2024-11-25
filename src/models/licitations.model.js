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

export const updateLicitation = async (licitation_id, user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_licitar SET precio = ?, precio_unidad = ?, cantidad = ?, cantidad_unidad = ?, presentacion_entrega = ?, valida_hasta = ?, informacion_adicional = ?
      WHERE id = ? AND id_usuario = ?`,
      [
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.valida_hasta,
        schema.informacion_adicional,
        licitation_id,
        user_id,
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
      `SELECT pl.*, p.nombre, p.imagen FROM producto_licitar pl INNER JOIN productos p ON p.id = pl.id_producto WHERE id_usuario = ? AND pl.estado != "Eliminada" AND pl.estado != "Cumplida"
      ORDER BY pl.fecha_publicacion ASC`,
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
      INNER JOIN productos p ON p.id = pl.id_producto WHERE id_usuario = ? AND pl.id_producto = ? AND pl.estado != "Eliminada"
      ORDER BY pl.fecha_publicacion ASC`,
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
      `SELECT pl.*, pf.razon_social, u.provincia, u.canton FROM producto_licitar pl
      INNER JOIN usuarios u ON u.id = pl.id_usuario
      INNER JOIN perfil_comprador pf ON pf.id_usuario = pl.id_usuario
      WHERE pl.id = ?`,
      [licitation_id]
    );
    const [quality_params] = await connection.query(
      `SELECT * FROM parametros_calidad pc INNER JOIN licitacion_contiene_calidad lcc ON lcc.id_parametros = pc.id WHERE lcc.id_licitacion = ?`,
      [licitation_id]
    );

    return {
      ...statement[0],
      quality_params,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLicitations = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM producto_licitar WHERE estado != "Eliminada" AND NOT (estado  "Cerrada" OR estado = "Eliminada" OR estado = "Cumplida")
      ORDER BY fecha_publicacion ASC`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLicitationsByProduct = async (product_id, user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pl.*, pf.razon_social, u.provincia, u.canton, COALESCE(AVG(c.puntaje), 0) AS promedio_calificacion,
      (
        SELECT pamc.nombre
        FROM licitacion_contiene_calidad lcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = lcc.id_parametros
        WHERE lcc.id_licitacion = pl.id
        LIMIT 1
      ) AS nombre_parametro_calidad,
      (
        SELECT pamc.min_calidad
        FROM licitacion_contiene_calidad lcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = lcc.id_parametros
        WHERE lcc.id_licitacion = pl.id
        LIMIT 1
      ) AS min_parametro_calidad,
      (
        SELECT pamc.max_calidad
        FROM licitacion_contiene_calidad lcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = lcc.id_parametros
        WHERE lcc.id_licitacion = pl.id
        LIMIT 1
      ) AS max_parametro_calidad
      FROM producto_licitar pl
      INNER JOIN usuarios u ON u.id = pl.id_usuario
      INNER JOIN perfil_comprador pf ON pf.id_usuario = pl.id_usuario
      LEFT JOIN calificacion c ON c.id_calificado = pl.id_usuario
      WHERE pl.id_producto = ? AND NOT (pl.estado = "Cerrada" OR pl.estado = "Eliminada" OR pl.estado = "Cumplida")
      AND NOT EXISTS (
          SELECT 1
          FROM propuesta_venta pv
          WHERE pv.id_licitacion = pl.id 
            AND pv.id_vendedor = ? 
            AND pv.estado_vendedor = "Rechazada"
      )
      GROUP BY pl.id
      ORDER BY pl.fecha_publicacion ASC`,
      [product_id, user_id]
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

export const setQuantity = async (licitation_id, quantity) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_licitar SET cantidad = cantidad - ? WHERE id = ?`,
      [quantity, licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkQuantity = async (licitation_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT cantidad FROM producto_licitar WHERE cantidad <= 0 AND id = ?`,
      [licitation_id]
    );
    return statement.length > 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const markLicitationAsDone = async (licitation_id) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_licitar SET estado = "Cumplida", cantidad = 0 WHERE id = ?`,
      [licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
