import pool from "../database/index.js";

export const getWarrantyPayments = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT pg.*, o.id as id_orden, count(*) AS entregas_pagas
      FROM entregas e 
      INNER JOIN condiciones_compra cc ON cc.id = e.id_condicion 
      INNER JOIN ordenes o ON o.id_entrega = e.id 
      INNER JOIN pago_garantia pg ON pg.id_condicion = e.id_condicion 
      WHERE o.id_comprador = ? 
      GROUP BY pg.id_condicion ORDER BY pg.fecha DESC`,
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPendingWarranties = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT count(*) AS cantidad_garantias_pendientes FROM pago_garantia WHERE estado = 0`
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getWarrantyById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM pago_garantia WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateWarrantyStatus = async (
  uuid,
  estado
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE pago_garantia SET estado = ? WHERE id = ?`,
      [estado, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createWarranty = async (
  uuid,
  uuid_condition,
  metodo_pago,
  porcentaje,
  total,
  estado = 1
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO pago_garantia (id, id_condicion, porcentaje, metodo_pago, total, estado) VALUES (?, ?, ?, ?, ?, ?)`,
      [uuid, uuid_condition, porcentaje, metodo_pago, total, estado]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getCondition = async (uuid_condition) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM condiciones_compra WHERE id = ? AND modo_pago = "Modo Garantía"`,
      [uuid_condition]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const checkWarrantyExists = async (uuid_condition) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM pago_garantia WHERE id_condicion = ?`,
      [uuid_condition]
    );
    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteWarranty = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM pago_garantia WHERE id = ?`,
      [uuid]
    );
    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
