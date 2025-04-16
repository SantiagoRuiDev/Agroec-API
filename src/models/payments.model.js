import { connection } from "../index.js";

export const getPaymentsByUser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM pagos_vendedores WHERE id_usuario = ? ORDER BY fecha DESC`,
      [uuid]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaymentsByOrderId = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM pagos_vendedores WHERE id_orden = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPaymentByUser = async (uuid, uuid_order, uuid_user, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO pagos_vendedores (id, id_usuario, id_orden, total, codigo_deposito, fecha) VALUES (?,?,?,?,?,?)`,
      [uuid, uuid_user, uuid_order, schema.total, schema.code, schema.date]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deletePaymentById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM pagos_vendedores WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};