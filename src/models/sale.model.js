import { connection } from "../index.js";

// Modelo de Ventas

export const createSale = async (sale_id, product_id, user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO producto_vender(id, id_producto, id_usuario, precio, precio_unidad, cantidad, cantidad_unidad, presentacion_entrega, fecha_entrega) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        sale_id,
        product_id,
        user_id,
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.fecha_entrega,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateSale = async (sale_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE producto_vender SET precio = ?, precio_unidad = ?, cantidad = ?, cantidad_unidad = ?, presentacion_entrega = ?, fecha_entrega = ? WHERE id = ?`,
      [
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.fecha_entrega,
        sale_id
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSalesByProduct = async (product_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.provincia, u.parroquia, u.canton, p.nombre, p.imagen, COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil,
      COALESCE(AVG(c.puntaje), 0) AS promedio_calificacion,
      (
        SELECT pamc.nombre
        FROM venta_contiene_calidad vcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = vcc.id_parametros
        WHERE vcc.id_venta = pv.id
        LIMIT 1
      ) AS nombre_parametro_calidad,
      (
        SELECT pamc.min_calidad
        FROM venta_contiene_calidad vcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = vcc.id_parametros
        WHERE vcc.id_venta = pv.id
        LIMIT 1
      ) AS min_parametro_calidad,
      (
        SELECT pamc.max_calidad
        FROM venta_contiene_calidad vcc
        LEFT JOIN parametros_calidad pamc ON pamc.id = vcc.id_parametros
        WHERE vcc.id_venta = pv.id
        LIMIT 1
      ) AS max_parametro_calidad
      FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto 
      INNER JOIN usuarios u ON u.id = pv.id_usuario
      LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_usuario
      LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_usuario
      LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_usuario
      LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_usuario
      LEFT JOIN calificacion c ON c.id_calificado = pv.id_usuario
      WHERE pv.id_producto = ?`,
      [product_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSalesByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, p.nombre, p.imagen, 
        (SELECT url_imagen FROM productos_vender_imagenes WHERE id_venta = pv.id LIMIT 1) AS producto_imagen
        FROM producto_vender pv 
       INNER JOIN productos p ON p.id = pv.id_producto WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleByIdentifier = async (identifer) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.provincia, u.parroquia, u.canton, p.nombre, p.imagen FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto 
      INNER JOIN usuarios u ON u.id = pv.id_usuario
      LEFT JOIN venta_contiene_calidad vcc ON vcc.id_venta = pv.id
      LEFT JOIN parametros_calidad pc ON pc.id = vcc.id_parametros
      WHERE pv.id = ?`,
      [identifer]
    );
    const [images] = await connection.query(
      `SELECT url_imagen, id FROM productos_vender_imagenes WHERE id_venta = ?`,
      [identifer]
    );
    const [quality_params] = await connection.query(
      `SELECT * FROM parametros_calidad pc INNER JOIN venta_contiene_calidad vcc ON vcc.id_parametros = pc.id WHERE vcc.id_venta = ?`,
      [identifer]
    );

    return {
      ...statement[0],
      images,
      quality_params
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleByIdentifierAndProduct = async (identifer, product) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.provincia, u.parroquia, u.canton, p.nombre, p.imagen FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto 
      INNER JOIN usuarios u ON u.id = pv.id_usuario
      LEFT JOIN venta_contiene_calidad vcc ON vcc.id_venta = pv.id
      LEFT JOIN parametros_calidad pc ON pc.id = vcc.id_parametros
      WHERE pv.id = ? AND pv.id_producto = ?`,
      [identifer, product]
    );
    const [images] = await connection.query(
      `SELECT url_imagen FROM productos_vender_imagenes WHERE id_venta = ?`,
      [identifer]
    );
    const [quality_params] = await connection.query(
      `SELECT * FROM parametros_calidad pc INNER JOIN venta_contiene_calidad vcc ON vcc.id_parametros = pc.id WHERE vcc.id_venta = ?`,
      [identifer]
    );

    return {
      ...statement[0],
      images,
      quality_params
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSalesById = async (sale_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, p.nombre, p.imagen, p.id as id_producto FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto WHERE pv.id = ?`,
      [sale_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllSales = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM producto_vender LIMIT 30`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const insertSaleImage = async (image_id, sale_id, url_imagen) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO productos_vender_imagenes (id, id_venta, url_imagen) VALUES (?,?,?)`,
      [image_id, sale_id, url_imagen]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteSale = async (user_id, sale_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM product_vender WHERE id_usuario = ? AND id = ?`,
      [user_id, sale_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteImage = async (image_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM productos_vender_imagenes WHERE id = ?`,
      [image_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
