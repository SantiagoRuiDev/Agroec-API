import pool from "../database/index.js";

export const getPaymentsByUser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM pagos_vendedores WHERE id_usuario = ? ORDER BY fecha DESC`,
      [uuid]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPaymentsByOrderId = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM pagos_vendedores WHERE id_orden = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createPaymentByUser = async (uuid, uuid_order, uuid_user, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO pagos_vendedores (id, id_usuario, id_orden, total, codigo_deposito, fecha) VALUES (?,?,?,?,?,?)`,
      [uuid, uuid_user, uuid_order, schema.total, schema.code, schema.date]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const deletePaymentById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM pagos_vendedores WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};