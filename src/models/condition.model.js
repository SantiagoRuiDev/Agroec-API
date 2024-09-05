import { connection } from "../index.js";

export const createContidion = async (condition_id) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO condiciones_compra(id) VALUES (?)`,
      [condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCondition = async (condition_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE condiciones_compra SET precio = ?, precio_unidad = ?, cantidad = ?, cantidad_unidad = ?, modo_pago = ?, notas = ?, precio_puesto_domicilio = ? WHERE id = ?`,
      [
        schema.precio,
        schema.precio_unidad,
        schema.cantidad,
        schema.cantidad_unidad,
        schema.modo_pago,
        schema.notas,
        schema.precio_puesto_domicilio,
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
          condition_id
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

    return statement.affectedRows;
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

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
