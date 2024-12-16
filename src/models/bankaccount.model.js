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