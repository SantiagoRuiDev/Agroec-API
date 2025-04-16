import pool from "../database/index.js";

export const createBankAccount = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO cuenta_bancaria
      (id, tipo_de_cuenta, numero_de_cuenta, seleccionar_banco, tipo_de_documento, numero_de_documento, nombre_del_propietario) 
      VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid,
        schema.tipo_de_cuenta,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getBankAccount = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM cuenta_bancaria WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteBankAccountById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM cuenta_bancaria WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateBankAccount = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE cuenta_bancaria c SET 
      c.tipo_de_cuenta = ?,
      c.numero_de_cuenta = ?, 
      c.seleccionar_banco = ?, 
      c.tipo_de_documento = ?, 
      c.numero_de_documento = ?, 
      c.nombre_del_propietario = ?
      WHERE c.id = ?`,
      [
        schema.tipo_de_cuenta,
        schema.numero_de_cuenta,
        schema.seleccionar_banco,
        schema.tipo_de_documento,
        schema.numero_de_documento,
        schema.nombre_del_propietario,
        uuid,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
