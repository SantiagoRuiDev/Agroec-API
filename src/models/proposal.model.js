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
        schema.informacion_adicional
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
      `SELECT pv.*, u.* FROM propuesta_venta pv INNER JOIN usuarios u ON pv.id_vendedor = u.id WHERE pv.id = ?`,
      [
        proposal_id
      ]
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
      [
        user_id
      ]
    );

    return statement;
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
          schema.informacion_adicional
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
        `SELECT pc.*, u.* FROM propuesta_compra pc INNER JOIN usuarios u ON pc.id_vendedor = u.id WHERE pc.id = ?`,
        [
          proposal_id
        ]
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
        [
          user_id
        ]
      );
  
      return statement;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  