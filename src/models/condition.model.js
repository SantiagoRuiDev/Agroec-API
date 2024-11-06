import { connection } from "../index.js";

export const createContidion = async (condition_id, product_id) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO condiciones_compra(id, id_producto) VALUES (?, ?)`,
      [condition_id, product_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCondition = async (condition_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE condiciones_compra SET precio = ?, precio_unidad = ?, cantidad = ?, cantidad_unidad = ?, modo_pago = ?, notas = ?, precio_puesto_domicilio = ?, politicas_recepcion = ? WHERE id = ?`,
      [
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.modo_pago,
        schema.notas,
        schema.precio_puesto_domicilio,
        schema.politicas_recepcion,
        condition_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateConditionWarranty = async (condition_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE condiciones_compra SET porcentaje_inicial = ?, modo_pago_final = ?, porcentaje_final = ? WHERE id = ?`,
      [
        schema.porcentaje_inicial,
        schema.modo_pago_final,
        schema.porcentaje_final,
        condition_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConditionBySaleProposal = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT c.* FROM propuesta_venta_contiene_condicion pvc INNER JOIN condiciones_compra c ON pvc.id_condicion = c.id WHERE pvc.id_propuesta = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConditionByBuyProposal = async (proposal_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT c.* FROM propuesta_compra_contiene_condicion pvc INNER JOIN condiciones_compra c ON pvc.id_condicion = c.id WHERE pvc.id_propuesta = ?`,
      [proposal_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConditionById = async (condition_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM condiciones_compra WHERE id = ?`,
      [condition_id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDeliveriesByCondition = async (condition_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM entregas WHERE id_condicion = ?`,
      [condition_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getConditionByChat = async (chat_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT cc.*, p.imagen, COALESCE(pccc.id_propuesta, pvcc.id_propuesta) AS id_propuesta,
      COALESCE (pc.estado_comprador, pv.estado_comprador) AS estado_comprador,
      COALESCE (pc.estado_vendedor, pv.estado_vendedor) AS estado_vendedor,
      COALESCE (pc.precio, pv.precio) AS precio_propuesta,
      COALESCE (pc.precio_unidad, pv.precio_unidad) AS precio_unidad_propuesta,
      COALESCE (pc.cantidad, pv.cantidad) AS cantidad_propuesta,
      COALESCE (pc.cantidad_unidad, pv.cantidad_unidad) AS cantidad_unidad_propuesta,
      COALESCE (pc.valida_hasta, pv.fecha_entrega) AS fecha_limite,
      COALESCE (pc.presentacion_entrega, pv.presentacion_entrega) AS presentacion_propuesta,
      COALESCE (pc.informacion_adicional, pv.informacion_adicional) AS informacion_adicional,
      COALESCE (pc.ubicacion_google_maps) AS ubicacion,
      COALESCE (pc.horarios) AS horarios
      FROM condiciones_compra cc 
      INNER JOIN chat ch ON cc.id = ch.id_condiciones 
      INNER JOIN productos p ON p.id = cc.id_producto
      LEFT JOIN propuesta_compra_contiene_condicion pccc ON pccc.id_condicion = cc.id
      LEFT JOIN propuesta_venta_contiene_condicion pvcc ON pvcc.id_condicion = cc.id
      LEFT JOIN propuesta_compra pc ON pc.id = pccc.id_propuesta
      LEFT JOIN propuesta_venta pv ON pv.id = pvcc.id_propuesta
      WHERE ch.id = ?`,
      [chat_id]
    );

    const [deliveries] = await connection.query(
      `SELECT e.*, o.id as id_orden, o.estado, pr.nombre, pr.ubicacion_google_maps, pr.id as id_punto, pr.direccion
      FROM entregas e 
      INNER JOIN puntos_recepcion pr ON pr.id = e.id_punto
      LEFT JOIN ordenes o ON o.id_entrega = e.id
      WHERE e.id_condicion = ?`,
      [statement[0].id]
    );

    const [quality_params] = await connection.query(
      `SELECT pc.*
      FROM parametros_calidad pc
      INNER JOIN condicion_contiene_parametros ccp ON ccp.id_parametros = pc.id
      INNER JOIN condiciones_compra cc ON cc.id = ccp.id_condicion
      WHERE cc.id = ?`,
      [statement[0].id]
    );

    return {
      condition: statement[0],
      deliveries: deliveries,
      quality_params: quality_params,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
