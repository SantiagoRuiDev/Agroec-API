import { connection } from "../index.js";
  
  export const getPaymentConditionByUser = async (uuid_user) => {
    try {
      const [statement] = await connection.query(
        `  SELECT * FROM entregas e INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion INNER JOIN ordenes o ON o.id_entrega = e.id LEFT JOIN pago_garantia pg ON pg.id_condicion = e.id_condicion WHERE o.id_comprador = "b308a85b-1f31-4082-b9e2-4d2a9483923f";`, [uuid_user]
      );
  
      return statement;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const createWarranty = async (uuid, uuid_condition, metodo_pago, porcentaje, total) => {
    try {
      const [statement] = await connection.query(
        `INSERT INTO pago_garantia (id, id_condicion, porcentaje, metodo_pago, total) VALUES (?, ?, ?, ?, ?)`,
        [uuid, uuid_condition, porcentaje, metodo_pago, total]
      );
  
      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getPaymentCondition = async (uuid_condition) => {
    try {
      const [statement] = await connection.query(
        `SELECT * FROM condiciones_compra WHERE id = ? AND modo_pago = "Modo Garantía"`, [uuid_condition]
      );
    
      return statement[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getWarrantyByUser = async (uuid_user) => {
    try {
      const [statement] = await connection.query(
        `SELECT e.id FROM entregas e
         INNER JOIN puntos_recepcion p ON e.id_punto = p.id
         WHERE p.id_usuario = ?`, [uuid_user]
      );
  
      return statement;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /*

  SELECT * FROM entregas e
INNER JOIN condiciones_compra cc
ON cc.id = e.id_condicion
INNER JOIN ordenes ON o.id_entrega = e.id
WHERE o.id_comprador = ?

  */

  export const checkWarrantyExists = async (uuid_condition) => {
    try {
      const [statement] = await connection.query(
        `SELECT * FROM pago_garantia WHERE id_condicion = ?`, [uuid_condition]
      );
      return statement[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
