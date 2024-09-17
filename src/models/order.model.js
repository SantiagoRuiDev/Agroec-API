import { connection } from "../index.js";

export const createOrder = async (
  order_id,
  buyer_id,
  seller_id,
  delivery_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO ordenes(id, id_comprador, id_vendedor, id_entrega) VALUES (?,?,?,?)`,
      [order_id, buyer_id, seller_id, delivery_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT o.id, o.estado, o.id_comprador, o.id_vendedor,p.id as producto, p.imagen, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN productos p ON p.id = cc.id_producto
       WHERE o.id_comprador = ? OR o.id_vendedor = ?
      `,
      [user_id, user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const getOrdersByBuyerDelivered = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       WHERE o.id_comprador = ? AND o.estado = "Aceptado"
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getOrdersById = async (order_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, o.creado,p.id as producto, p.imagen, cc.precio, cc.politicas_recepcion, cc.id as id_negociacion, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN productos p ON p.id = cc.id_producto
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       WHERE o.id = ?
      `,
      [order_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
