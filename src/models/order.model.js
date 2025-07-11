import pool from "../database/index.js";

export const createOrder = async (
  order_id,
  buyer_id,
  seller_id,
  delivery_id
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO ordenes(id, id_comprador, id_vendedor, id_entrega) VALUES (?,?,?,?)`,
      [order_id, buyer_id, seller_id, delivery_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersByUser = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.estado, o.creado, o.id_comprador, o.id_vendedor,p.id as producto, p.imagen, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN productos p ON p.id = cc.id_producto
       WHERE o.id_comprador = ? OR o.id_vendedor = ?
       GROUP BY o.id
       ORDER BY o.creado DESC
      `,
      [user_id, user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getAllOrders = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.estado, o.creado, o.id_comprador, o.id_vendedor,p.id as producto, p.imagen, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN productos p ON p.id = cc.id_producto
       GROUP BY o.id
       ORDER BY o.creado DESC
      `
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrderUsers = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id_comprador, o.id_vendedor, cc.id_producto FROM ordenes o
      INNER JOIN entregas e ON e.id = o.id_entrega
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
       WHERE o.id = ? ORDER BY o.creado DESC
      `,
      [order_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateOrderStatus = async (order_id, status) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE ordenes SET estado = ? WHERE id = ?
      `,
      [status, order_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersByBuyerDelivered = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       WHERE o.id_comprador = ? AND o.estado = "Aceptado" ORDER BY o.creado DESC
       GROUP o.id
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersBySellerUndelivered = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.creado, o.id_comprador, o.id_vendedor, cc.precio, cc.precio_unidad, o.estado
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion, p.id as id_producto, p.imagen 
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN productos p ON p.id = cc.id_producto
       LEFT JOIN fee f ON f.id_entrega = e.id
       WHERE o.id_vendedor = ? AND (o.estado = "Pendiente de entrega") 
       GROUP BY o.id
       ORDER BY o.creado DESC
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getOrdersBySellerUndeliveredBeforeDate = async (user_id, date) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, e.fecha_entrega, e.hora_entrega
	     FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       WHERE o.id_vendedor = ? AND o.estado = "Pendiente de entrega" AND e.fecha_entrega < ?
       GROUP BY o.id
      `,
      [user_id, date]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getOrdersByBuyerNotReceivedBeforeDate = async (user_id, date) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, e.fecha_entrega, e.hora_entrega
	     FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       WHERE o.id_comprador = ? AND o.estado NOT IN ('Rechazado', 'Aceptado') AND e.fecha_entrega < ?
       GROUP BY o.id
      `,
      [user_id, date]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersBySellerDeliveredAndPaid = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, cc.precio, cc.precio_unidad
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
      INNER JOIN billetera b ON b.id_usuario = o.id_vendedor
      LEFT JOIN fee f ON f.id_billetera = b.id AND f.id_entrega = e.id
       WHERE o.id_vendedor = ? AND o.estado = "Aceptado" AND f.monto_fee IS NOT NULL GROUP BY o.id ORDER BY o.creado DESC
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersByBuyerDeliveredAndPaid = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, cc.precio, cc.precio_unidad, o.estado
		, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
      INNER JOIN billetera b ON b.id_usuario = o.id_comprador
      LEFT JOIN fee f ON f.id_billetera = b.id
       WHERE o.id_comprador = ? AND o.estado = "Aceptado" AND f.monto_fee IS NOT NULL
       GROUP BY o.id
       ORDER BY o.creado DESC
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersByConditions = async (condition_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.id_comprador, o.id_vendedor, cc.id_producto FROM ordenes o 
      INNER JOIN entregas e ON e.id = o.id_entrega
      INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
      WHERE cc.id = ?
      `,
      [condition_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getDeliveryInformationById = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, p.imagen, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega, pc.razon_social as comprador_nombre,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion, pr.ubicacion_longitud, pr.ubicacion_latitud
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN productos p ON p.id = cc.id_producto
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       LEFT JOIN perfil_comprador pc ON pc.id_usuario = o.id_comprador
       WHERE o.id = ?
      `,
      [order_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getOrdersById = async (order_id, user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.id_comprador, o.estado, o.id_vendedor, o.cantidad_recibida, o.creado,p.id as producto, p.imagen, cc.notas, cc.precio_puesto_domicilio, cc.modo_pago, cc.modo_pago_final, cc.porcentaje_inicial, cc.porcentaje_final, cc.precio, cc.politicas_recepcion, ch.id as id_chat, cc.cantidad as condicion_cantidad, cc.id as id_negociacion, cc.precio_unidad
		,e.id as id_entrega, e.cantidad, e.cantidad_unidad, e.fecha_entrega, e.hora_entrega, pc.razon_social as comprador_nombre,
		pr.nombre, pr.ubicacion_google_maps, pr.direccion, pr.ubicacion_longitud, pr.ubicacion_latitud,
       COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS vendedor_nombre
	   FROM ordenes o 
       INNER JOIN entregas e ON o.id_entrega = e.id
       INNER JOIN condiciones_compra cc ON e.id_condicion = cc.id
       INNER JOIN productos p ON p.id = cc.id_producto
       INNER JOIN puntos_recepcion pr ON e.id_punto = pr.id
       INNER JOIN chat ch ON ch.id_condiciones = cc.id
       LEFT JOIN perfil_comprador pc ON pc.id_usuario = o.id_comprador
       LEFT JOIN perfil_agricultor pa ON pa.id_usuario = o.id_vendedor
       LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = o.id_vendedor
       LEFT JOIN perfil_comerciante pca ON pca.id_usuario = o.id_vendedor
       LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = o.id_vendedor
       WHERE o.id = ?
      `,
      [order_id]
    );

    const [warranty] = await db.query(
      `SELECT * FROM pago_garantia WHERE id_condicion = ?
      `,
      [statement[0].id_negociacion]
    );

    const [statuses] = await db.query(
      `SELECT * FROM estado_ordenes WHERE id_orden = ?
      `,
      [order_id]
    );

    const [fee] = await db.query(
      `SELECT f.* FROM fee f 
      INNER JOIN entregas e ON e.id = f.id_entrega
      INNER JOIN ordenes o ON o.id_entrega = e.id
      INNER JOIN billetera b ON f.id_billetera = b.id 
      WHERE b.id_usuario = ? AND o.id = ?
        `,
      [user_id, order_id]
    );

    const [payment] = await db.query(
      `SELECT * FROM pagos_vendedores WHERE id_orden = ?
        `,
      [order_id]
    );

    return {
      order: statement[0],
      statuses: statuses,
      warranty: warranty[0] != undefined ? warranty[0] : null,
      payment: payment[0] != undefined ? payment[0] : null,
      fee: fee[0] != undefined ? fee[0] : null,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateOrderReceivedQuantity = async (quantity, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE ordenes SET cantidad_recibida = ? WHERE id = ?
      `,
      [quantity, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createShippingStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado) VALUES (?,?, 'En camino')
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createDeliveredStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado) VALUES (?,?, 'Entregada')
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createAcceptedStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado) VALUES (?,?, 'Aceptado')
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createReceivedStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado) VALUES (?,?, 'Recibido')
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createRejectedStatus = async (uuid, order_id, reason) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado, motivo) VALUES (?,?, 'Rechazado', ?)
      `,
      [uuid, order_id, reason]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createRevisionStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden, estado) VALUES (?,?, 'Revision')
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createPendingStatus = async (uuid, order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO estado_ordenes (id, id_orden) VALUES (?,?)
      `,
      [uuid, order_id]
    );

    if (statement.affectedRows > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const checkShippingStatus = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM estado_ordenes
      WHERE id_orden = ? AND estado = 'En camino'
      `,
      [order_id]
    );

    if (statement.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const checkDeliveredStatus = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM estado_ordenes
      WHERE id_orden = ? AND estado = "Entregada"
      `,
      [order_id]
    );

    if (statement.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const checkRevisionStatus = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM estado_ordenes
      WHERE id_orden = ? AND estado = 'Revision'
      `,
      [order_id]
    );

    if (statement.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const checkRejectedStatus = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM estado_ordenes WHERE id_orden = ? AND estado = 'Rechazado'
      `,
      [order_id]
    );

    if (statement.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const checkPendingStatus = async (order_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM estado_ordenes WHERE id_orden = ? AND estado = 'Pendiente de entrega'
      `,
      [order_id]
    );

    if (statement.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteOrder = async (delivery_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM order WHERE id_entrega = ?
      `,
      [delivery_id]
    );

    return statement.affectedRows > 0 ? true : false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteDelivery = async (delivery_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM entregas WHERE id = ?
      `,
      [delivery_id]
    );

    return statement.affectedRows > 0 ? true : false;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getUnpaidOrders = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, o.creado, e.fecha_entrega, e.cantidad, e.cantidad_unidad, e.hora_entrega, cc.id_producto, cc.precio, cc.precio_unidad, cc.id_producto, p.imagen, f.monto_fee  FROM estado_ordenes eo
      INNER JOIN ordenes o ON o.id = eo.id_orden
      INNER JOIN entregas e ON e.id = o.id_entrega
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
      INNER JOIN productos p ON p.id = cc.id_producto
      INNER JOIN billetera b ON b.id_usuario = o.id_comprador
      LEFT JOIN fee f ON f.id_billetera = b.id AND e.id = f.id_entrega
      WHERE eo.estado = "Recibido" AND f.monto_fee IS NULL AND o.id_comprador = ?
      GROUP BY o.id
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getUnpaidOrdersBySeller = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, e.fecha_entrega, e.cantidad, e.cantidad_unidad, e.hora_entrega, cc.precio, cc.precio_unidad, cc.id_producto, p.imagen  FROM estado_ordenes eo
      INNER JOIN ordenes o ON o.id = eo.id_orden
      INNER JOIN entregas e ON e.id = o.id_entrega
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
      INNER JOIN productos p ON p.id = cc.id_producto
      INNER JOIN billetera b ON b.id_usuario = o.id_vendedor
      LEFT JOIN fee ON fee.id_billetera = b.id
      WHERE eo.estado = "Aceptado" AND fee.monto_fee IS NULL AND o.id_vendedor = ?
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPaidOrdersBySeller = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT o.id, e.fecha_entrega, e.cantidad, e.cantidad_unidad, e.hora_entrega, cc.precio, cc.precio_unidad, cc.id_producto, p.imagen  FROM estado_ordenes eo
      INNER JOIN ordenes o ON o.id = eo.id_orden
      INNER JOIN entregas e ON e.id = o.id_entrega
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion
      INNER JOIN productos p ON p.id = cc.id_producto
      INNER JOIN billetera b ON b.id_usuario = o.id_vendedor
      LEFT JOIN fee ON fee.id_billetera = b.id AND fee.id_entrega = e.id
      WHERE eo.estado = "Aceptado" AND fee.monto_fee IS NOT NULL AND o.id_vendedor = ?
      GROUP BY o.id
      `,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
