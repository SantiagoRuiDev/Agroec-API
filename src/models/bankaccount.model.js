import { connection } from "../index.js";

export const createBankAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO cuenta_bancaria
      (id, tipo_de_cuenta, numero_de_cuenta, seleccionar_banco, tipo_de_documento, numero_de_documento, nombre_del_propietario) 
      VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [uuid, schema.tipo_de_cuenta, schema.numero_de_cuenta, schema.seleccionar_banco, schema.tipo_de_documento, schema.numero_de_documento, schema.nombre_del_propietario]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getBankAccount = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM cuenta_bancaria WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateBankAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
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
  }
};
