import { connection } from "../index.js";

// Modelo de Ventas

export const createSaleProposal = async (
  proposal_id,
  licitation_id,
  user_id,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO propuesta_venta(id, id_licitacion, id_vendedor, precio, precio_unidad, cantidad, cantidad_unidad, presentacion_entrega, fecha_entrega, informacion_adicional) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        proposal_id,
        licitation_id,
        user_id,
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.fecha_entrega,
        schema.informacion_adicional,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleProposalById = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u1.id as id_comprador FROM propuesta_venta pv
      INNER JOIN producto_licitar pl ON pl.id = pv.id_licitacion INNER JOIN usuarios u1 ON u1.id = pl.id_usuario
      INNER JOIN usuarios u2 ON pv.id_vendedor = u2.id WHERE pv.id = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleDeliveryWithConditionsById = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT e.* FROM propuesta_venta pv INNER JOIN propuesta_venta_contiene_condicion pvcc ON pv.id = pvcc.id_propuesta INNER JOIN condiciones_compra c ON pvcc.id_condicion = c.id INNER JOIN entregas e ON e.id_condicion = c.id WHERE pv.id = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleProposalByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.*, u.*, pl.id_producto,
      (SELECT m.id_remitente
      FROM condiciones_compra cc
      INNER JOIN propuesta_venta_contiene_condicion pvcc ON cc.id = pvcc.id_condicion
      INNER JOIN chat c ON c.id_condiciones = cc.id
      INNER JOIN mensajes m ON m.id_chat = c.id
      WHERE pvcc.id_propuesta = pv.id
      ORDER BY m.fecha DESC
      LIMIT 1
      ) AS lastMessage,
      (SELECT m.leido
      FROM condiciones_compra cc
      INNER JOIN propuesta_venta_contiene_condicion pvcc ON cc.id = pvcc.id_condicion
      INNER JOIN chat c ON c.id_condiciones = cc.id
      INNER JOIN mensajes m ON m.id_chat = c.id
      WHERE pvcc.id_propuesta = pv.id
      ORDER BY m.fecha DESC
      LIMIT 1
      ) AS leido
      FROM propuesta_venta pv 
      INNER JOIN producto_licitar pl ON pl.id = pv.id_licitacion
      INNER JOIN usuarios u ON pv.id_vendedor = u.id 
      WHERE u.id = ? AND NOT (pv.estado_vendedor = "Aceptada" AND pv.estado_comprador = "Aceptada");`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProposalInformation = async (proposal_id) => {
  try {
    const [sale] = await connection.query(
      `SELECT * FROM propuesta_venta pv WHERE pv.id = ?`,
      [proposal_id]
    );
    const [licitation] = await connection.query(
      `SELECT * FROM propuesta_compra pc WHERE pc.id = ?`,
      [proposal_id]
    );

    let statement = null;
    if (sale[0]) {
      [statement] = await connection.query(
        `SELECT pl.*, pv.id_vendedor, pv.fecha_entrega,
        COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil,
        COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS nombre,
        COALESCE(pa.apellido, pac.apellido, pca.apellido, pcaq.apellido) AS apellido,
        u.provincia, u.canton
        FROM producto_licitar pl
        INNER JOIN propuesta_venta pv ON pv.id_licitacion = pl.id
        INNER JOIN usuarios u ON u.id = pl.id_usuario
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_vendedor
        WHERE pv.id = ?`,
        [proposal_id]
      );
    } else if (licitation[0]) {
      [statement] = await connection.query(
        `SELECT pv.*, pv.id_usuario as id_vendedor, pc.valida_hasta as fecha_entrega,
        COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil,
        COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre) AS nombre,
        COALESCE(pa.apellido, pac.apellido, pca.apellido, pcaq.apellido) AS apellido,
        u.provincia, u.canton
        FROM producto_vender pv
        INNER JOIN propuesta_compra pc ON pc.id_venta = pv.id
        INNER JOIN usuarios u ON u.id = pc.id_comprador
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_usuario
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_usuario
        WHERE pc.id = ?`,
        [proposal_id]
      );
    }

    const [quality_params] = await connection.query(
      `SELECT 
      pc.*
      FROM parametros_calidad pc
      LEFT JOIN licitacion_contiene_calidad lcc ON lcc.id_parametros = pc.id
      LEFT JOIN venta_contiene_calidad vcc ON vcc.id_parametros = pc.id
      WHERE lcc.id_licitacion = ? OR vcc.id_venta = ?`,
      [statement[0].id, statement[0].id]
    );

    return { ...statement[0], quality_params };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleProposalByLicitation = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.* FROM propuesta_venta pv 
      INNER JOIN producto_licitar pl ON pv.id_licitacion = pl.id 
      WHERE pl.id_usuario = ? AND NOT (pv.estado_vendedor = "Aceptada" AND pv.estado_comprador = "Aceptada") AND pv.estado_comprador != "Rechazada";`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleProposalByUserAndProduct = async (user_id, product_id) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT pv.*,
       pc.id_producto, 
       uv.provincia, uv.canton, u.id as id_comprador,
       ch.id AS chat_id,
       COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil
        FROM propuesta_venta pv
        INNER JOIN propuesta_venta_contiene_condicion pvcc ON pv.id = pvcc.id_propuesta
        INNER JOIN condiciones_compra cc ON cc.id = pvcc.id_condicion 
        INNER JOIN chat ch ON ch.id_condiciones = cc.id
        INNER JOIN producto_licitar pc ON pc.id = pv.id_licitacion
        INNER JOIN usuarios uv ON pv.id_vendedor = uv.id 
        INNER JOIN usuarios u ON pc.id_usuario = u.id 
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_vendedor
    	WHERE pv.id_vendedor = ? AND pc.id_producto = ? AND NOT (pv.estado_vendedor = "Aceptada" AND pv.estado_comprador = "Aceptada") AND pv.estado_vendedor != "Rechazada"`,
      [user_id, product_id]
    );

    // Iterar sobre las propuestas para obtener el último mensaje de cada una
    const proposalsWithMessages = await Promise.all(
      proposals.map(async (proposal) => {
        // Obtener el último mensaje del chat correspondiente a la propuesta actual
        const [lastMessage] = await connection.query(
          `SELECT m.* FROM mensajes m INNER JOIN chat c ON m.id_chat = c.id WHERE c.id = ? ORDER BY m.fecha DESC LIMIT 1`,
          [proposal.chat_id]
        );

        // Retornar la propuesta con su último mensaje
        return {
          ...proposal,
          lastMessage: lastMessage[0] || null, // Si no hay mensaje, poner null
        };
      })
    );

    return proposalsWithMessages;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSaleProposalByBuyerAndProduct = async (user_id, product_id) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT pv.*,
       pc.id_producto, 
       uv.provincia, uv.canton, u.id as id_comprador,
       ch.id AS chat_id,
       COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil
        FROM propuesta_venta pv
        INNER JOIN propuesta_venta_contiene_condicion pvcc ON pv.id = pvcc.id_propuesta
        INNER JOIN condiciones_compra cc ON cc.id = pvcc.id_condicion 
        INNER JOIN chat ch ON ch.id_condiciones = cc.id
        INNER JOIN producto_licitar pc ON pc.id = pv.id_licitacion
        INNER JOIN usuarios uv ON pv.id_vendedor = uv.id 
        INNER JOIN usuarios u ON pc.id_usuario = u.id 
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_vendedor
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_vendedor
    	WHERE u.id = ? AND pc.id_producto = ? AND pv.estado_comprador != "Rechazada"`,
      [user_id, product_id]
    );

    // Iterar sobre las propuestas para obtener el último mensaje de cada una
    const proposalsWithMessages = await Promise.all(
      proposals.map(async (proposal) => {
        // Obtener el último mensaje del chat correspondiente a la propuesta actual
        const [lastMessage] = await connection.query(
          `SELECT m.* FROM mensajes m INNER JOIN chat c ON m.id_chat = c.id WHERE c.id = ? ORDER BY m.fecha DESC LIMIT 1`,
          [proposal.chat_id]
        );

        // Retornar la propuesta con su último mensaje
        return {
          ...proposal,
          lastMessage: lastMessage[0] || null, // Si no hay mensaje, poner null
        };
      })
    );

    return proposalsWithMessages;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSaleProposalStateBySeller = async (sale_id, state) => {
  try {
    const [statement] = await connection.query(
      `UPDATE propuesta_venta SET estado_vendedor = ? WHERE id = ?`,
      [state, sale_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSaleProposalStateByBuyer = async (sale_id, state) => {
  try {
    const [statement] = await connection.query(
      `UPDATE propuesta_venta SET estado_comprador = ? WHERE id = ?`,
      [state, sale_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSaleCondition = async (
  contain_id,
  sale_id,
  condition_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO propuesta_venta_contiene_condicion(id, id_propuesta, id_condicion) VALUES (?,?,?)`,
      [contain_id, sale_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Licitaciones/Compras a Ventas

export const createLicitationProposal = async (
  proposal_id,
  sale_id,
  user_id,
  schema
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO propuesta_compra(id, id_venta, id_comprador, precio, precio_unidad, cantidad, cantidad_unidad, presentacion_entrega, valida_hasta, horarios, ubicacion_google_maps, informacion_adicional) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        proposal_id,
        sale_id,
        user_id,
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.presentacion_entrega,
        schema.valida_hasta,
        schema.horarios,
        schema.ubicacion_google_maps,
        schema.informacion_adicional,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalById = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pc.*, u1.id as id_vendedor FROM propuesta_compra pc
      INNER JOIN producto_vender pv ON pv.id = pc.id_venta INNER JOIN usuarios u1 ON u1.id = pv.id_usuario
      INNER JOIN usuarios u2 ON pc.id_comprador = u2.id WHERE pc.id = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationDeliveryWithConditionsById = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT e.* FROM propuesta_compra pc 
      INNER JOIN propuesta_compra_contiene_condicion pccc ON pc.id = pccc.id_propuesta 
      INNER JOIN condiciones_compra c ON pccc.id_condicion = c.id
      INNER JOIN entregas e ON e.id_condicion = c.id WHERE pc.id = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalBySeller = async (user_id) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT 
    pc.*, 
    u.*, 
    pv.id_producto,
    (SELECT m.id_remitente
     FROM condiciones_compra cc
     INNER JOIN propuesta_compra_contiene_condicion pccc ON cc.id = pccc.id_condicion
     INNER JOIN chat c ON c.id_condiciones = cc.id
     INNER JOIN mensajes m ON m.id_chat = c.id
     WHERE pccc.id_propuesta = pc.id
     ORDER BY m.fecha DESC
     LIMIT 1
    ) AS lastMessage
    FROM propuesta_compra pc
    INNER JOIN usuarios u ON pc.id_comprador = u.id 
    INNER JOIN producto_vender pv ON pv.id = pc.id_venta
    WHERE pv.id_usuario = ?
    AND NOT (pc.estado_vendedor = "Aceptada" AND pc.estado_comprador = "Aceptada");`,
      [user_id]
    );

    return proposals;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalByUser = async (user_id) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT 
    pc.*, 
    u.*, 
    pv.id_producto,
    (SELECT m.id_remitente
     FROM condiciones_compra cc
     INNER JOIN propuesta_compra_contiene_condicion pccc ON cc.id = pccc.id_condicion
     INNER JOIN chat c ON c.id_condiciones = cc.id
     INNER JOIN mensajes m ON m.id_chat = c.id
     WHERE pccc.id_propuesta = pc.id
     ORDER BY m.fecha DESC
     LIMIT 1
    ) AS lastMessage,
      (SELECT m.leido
      FROM condiciones_compra cc
      INNER JOIN propuesta_compra_contiene_condicion pccc ON cc.id = pccc.id_condicion
      INNER JOIN chat c ON c.id_condiciones = cc.id
      INNER JOIN mensajes m ON m.id_chat = c.id
      WHERE pccc.id_propuesta = pc.id
      ORDER BY m.fecha DESC
      LIMIT 1
      ) AS leido
    FROM propuesta_compra pc
    INNER JOIN usuarios u ON pc.id_comprador = u.id 
    INNER JOIN producto_vender pv ON pv.id = pc.id_venta
    WHERE u.id = ? AND NOT (pc.estado_vendedor = "Aceptada" AND pc.estado_comprador = "Aceptada") AND pc.estado_comprador != "Rechazada"`,
      [user_id]
    );

    return proposals;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalByUserAndProduct = async (
  user_id,
  product_id
) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT pc.*, 
       pv.id_producto, 
       uv.provincia, uv.canton, uv.id as id_vendedor,
       ch.id AS chat_id,
       COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil
        FROM propuesta_compra pc
        INNER JOIN propuesta_compra_contiene_condicion pccc ON pc.id = pccc.id_propuesta
        INNER JOIN condiciones_compra cc ON cc.id = pccc.id_condicion 
        INNER JOIN chat ch ON ch.id_condiciones = cc.id
        INNER JOIN usuarios u ON pc.id_comprador = u.id 
        INNER JOIN producto_vender pv ON pv.id = pc.id_venta
        INNER JOIN usuarios uv ON pv.id_usuario = uv.id 
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_usuario
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_usuario
        WHERE u.id = ? AND pv.id_producto = ? AND NOT (pc.estado_vendedor = "Aceptada" AND pc.estado_comprador = "Aceptada") AND pc.estado_comprador != "Rechazada"`,
      [user_id, product_id]
    );

    // Iterar sobre las propuestas para obtener el último mensaje de cada una
    const proposalsWithMessages = await Promise.all(
      proposals.map(async (proposal) => {
        // Obtener el último mensaje del chat correspondiente a la propuesta actual
        const [lastMessage] = await connection.query(
          `SELECT m.* FROM mensajes m INNER JOIN chat c ON m.id_chat = c.id WHERE c.id = ? ORDER BY m.fecha DESC LIMIT 1`,
          [proposal.chat_id]
        );

        // Retornar la propuesta con su último mensaje
        return {
          ...proposal,
          lastMessage: lastMessage[0] || null, // Si no hay mensaje, poner null
        };
      })
    );

    return proposalsWithMessages;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalBySellerAndProduct = async (
  user_id,
  product_id
) => {
  try {
    // Obtener todas las propuestas del usuario
    const [proposals] = await connection.query(
      `SELECT pc.*, 
       pv.id_producto, 
       uv.provincia, uv.canton, uv.id as id_vendedor,
       ch.id AS chat_id,
       COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil) AS tipo_perfil
        FROM propuesta_compra pc
        INNER JOIN propuesta_compra_contiene_condicion pccc ON pc.id = pccc.id_propuesta
        INNER JOIN condiciones_compra cc ON cc.id = pccc.id_condicion 
        INNER JOIN chat ch ON ch.id_condiciones = cc.id
        INNER JOIN usuarios u ON pc.id_comprador = u.id 
        INNER JOIN producto_vender pv ON pv.id = pc.id_venta
        INNER JOIN usuarios uv ON pv.id_usuario = uv.id 
        LEFT JOIN perfil_agricultor pa ON pa.id_usuario = pv.id_usuario
        LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante pca ON pca.id_usuario = pv.id_usuario
        LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = pv.id_usuario
        WHERE pv.id_usuario = ? AND pv.id_producto = ? AND NOT (pc.estado_vendedor = "Aceptada" AND pc.estado_comprador = "Aceptada") AND pc.estado_vendedor != "Rechazada"
        GROUP BY pc.id`,
      [user_id, product_id]
    );

    // Iterar sobre las propuestas para obtener el último mensaje de cada una
    const proposalsWithMessages = await Promise.all(
      proposals.map(async (proposal) => {
        // Obtener el último mensaje del chat correspondiente a la propuesta actual
        const [lastMessage] = await connection.query(
          `SELECT m.* FROM mensajes m INNER JOIN chat c ON m.id_chat = c.id WHERE c.id = ? ORDER BY m.fecha DESC LIMIT 1`,
          [proposal.chat_id]
        );

        // Retornar la propuesta con su último mensaje
        return {
          ...proposal,
          lastMessage: lastMessage[0] || null, // Si no hay mensaje, poner null
        };
      })
    );

    return proposalsWithMessages;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLicitationProposalBySale = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pv.id_producto, p.imagen, COUNT(pc.id) AS num_propuestas
      FROM propuesta_compra pc
      INNER JOIN producto_vender pv ON pv.id = pc.id_venta
      INNER JOIN productos p ON p.id = pv.id_producto
      WHERE (pc.estado_vendedor != "Aceptada" AND pc.estado_comprador != "Aceptada") AND pv.id_usuario = ?
      GROUP BY pv.id_producto;`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateLicitationProposalStateBySeller = async (
  proposal_id,
  state
) => {
  try {
    const [statement] = await connection.query(
      `UPDATE propuesta_compra SET estado_vendedor = ? WHERE id = ?`,
      [state, proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateLicitationProposalStateByBuyer = async (
  proposal_id,
  state
) => {
  try {
    const [statement] = await connection.query(
      `UPDATE propuesta_compra SET estado_comprador = ? WHERE id = ?`,
      [state, proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createLicitationCondition = async (
  contain_id,
  licitation_id,
  condition_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO propuesta_compra_contiene_condicion(id, id_propuesta, id_condicion) VALUES (?,?,?)`,
      [contain_id, licitation_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProposalByConditions = async (condition_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT COALESCE(pccc.id_propuesta, pvcc.id_propuesta) AS id_propuesta, cc.modo_pago
      FROM condiciones_compra cc 
      LEFT JOIN propuesta_compra_contiene_condicion pccc ON pccc.id_condicion = cc.id
      LEFT JOIN propuesta_venta_contiene_condicion pvcc ON pvcc.id_condicion = cc.id
      WHERE cc.id = ?`,
      [condition_id]
    );

    if (statement[0]) {
      const [sale] = await connection.query(
        `SELECT *
        FROM propuesta_venta pv 
        WHERE pv.id = ?`,
        [statement[0].id_propuesta]
      );

      if (sale[0]) {
        const [buyer] = await connection.query(
          `SELECT pl.id_usuario
          FROM producto_licitar pl 
          WHERE pl.id = ?`,
          [sale[0].id_licitacion]
        );
        sale[0].id_comprador = buyer[0].id_usuario;
        return {
          proposal: sale[0],
          type: "Sale",
          method: statement[0].modo_pago,
        };
      }

      const [licitation] = await connection.query(
        `SELECT *
        FROM propuesta_compra pc 
        WHERE pc.id = ?`,
        [statement[0].id_propuesta]
      );

      if (licitation[0]) {
        const [seller] = await connection.query(
          `SELECT pv.id_usuario
          FROM producto_vender pv 
          WHERE pv.id = ?`,
          [licitation[0].id_venta]
        );
        licitation[0].id_vendedor = seller[0].id_usuario;
        return {
          proposal: licitation[0],
          type: "Licitation",
          method: statement[0].modo_pago,
        };
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
