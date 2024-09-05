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
      `SELECT pv.*, u.* FROM propuesta_venta pv INNER JOIN usuarios u ON pv.id_vendedor = u.id WHERE u.id = ?`,
      [user_id]
    );

    return statement;
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

export const getLicitationProposalByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT pc.*, u.* FROM propuesta_compra pc INNER JOIN usuarios u ON pc.id_comprador = u.id WHERE u.id = ?`,
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
