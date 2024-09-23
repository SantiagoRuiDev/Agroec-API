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


export const updateOrderStatus = async (order_id, status) => {
  try {
    const [statement] = await connection.query(
      `UPDATE ordenes SET estado = ? WHERE id = ?
      `,
      [status, order_id]
    );

    return statement.affectedRows;
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
      `SELECT o.id, o.id_comprador, o.estado, o.id_vendedor, o.creado,p.id as producto, p.imagen, cc.modo_pago, cc.porcentaje_inicial, cc.porcentaje_final, cc.precio, cc.politicas_recepcion, ch.id as id_chat, cc.cantidad as condicion_cantidad, cc.id as id_negociacion, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion,
       COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS vendedor_nombre,
       COALESCE(pa.apellido, pac.apellido, pca.apellido, pcaq.apellido) AS vendedor_apellido
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN productos p ON p.id = cc.id_producto
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN chat ch ON ch.id_condiciones = cc.id
       LEFT JOIN perfil_agricultor pa ON pa.id_usuario = o.id_vendedor
       LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = o.id_vendedor
       LEFT JOIN perfil_comerciante pca ON pca.id_usuario = o.id_vendedor
       LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = o.id_vendedor
       WHERE o.id = ?
      `,
      [order_id]
    );

    const [warranty] = await connection.query(
      `SELECT * FROM pago_garantia WHERE id_condicion = ?
      `,
      [statement[0].id_negociacion])

    const [statuses] = await connection.query(
      `SELECT * FROM estado_ordenes WHERE id_orden = ?
      `,
      [order_id])

    return {order: statement[0], statuses: statuses, warranty: (warranty[0] != undefined) ?  warranty[0] : null };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const createPendingStatus = async (uuid, order_id) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO estado_ordenes (id, id_orden) VALUES (?,?)
      `,
      [uuid, order_id])
    
    if(statement.affectedRows > 0){
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteOrder = async (delivery_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM order WHERE id_entrega = ?
      `,
      [delivery_id]
    );

    return (statement.affectedRows > 0) ? true : false;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteDelivery = async (delivery_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM entregas WHERE id = ?
      `,
      [delivery_id]
    );

    return (statement.affectedRows > 0) ? true : false;
  } catch (error) {
    throw new Error(error.message);
  }
}