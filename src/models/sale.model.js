import { connection } from "../index.js";

// Modelo de Ventas

export const createSale = async (
  sale_id,
  product_id,
  user_id,
  schema
) => {
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

export const getSalesByProduct = async (product_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.provincia, u.parroquia, u.canton, p.nombre, p.imagen FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto 
      INNER JOIN usuarios u ON u.id = pv.id_usuario
      WHERE pv.id_producto = ?`,
      [
        product_id
      ]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSalesByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, p.nombre, p.imagen FROM producto_vender pv INNER JOIN productos p ON p.id = pv.id_producto WHERE id_usuario = ?`,
      [
        user_id
      ]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleByIdentifier = async (identifer, product) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.provincia, u.parroquia, u.canton, p.nombre, p.imagen FROM producto_vender pv 
      INNER JOIN productos p ON p.id = pv.id_producto 
      INNER JOIN usuarios u ON u.id = pv.id_usuario
      WHERE pv.id = ? AND pv.id_producto = ?`,
      [
        identifer,
        product
      ]
    );
    const [images] = await connection.query(
      `SELECT url_imagen FROM productos_vender_imagenes WHERE id_venta = ?`,
      [
        identifer
      ]
    );

    return {
      ...statement[0],
      images
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSalesById = async (sale_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, p.nombre, p.imagen FROM producto_vender pv INNER JOIN productos p ON p.id = pv.id_producto WHERE pv.id = ?`,
      [
        sale_id
      ]
    );

    return statement;
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
      [
        user_id,
        sale_id
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

