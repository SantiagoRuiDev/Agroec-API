import { connection } from "../index.js";

export const createBankAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO cuenta_bancaria
      (id, tipo_de_cuenta, tipo_de_banco) 
      VALUES(?,?,?)`,
      [uuid, schema.tipo_de_cuenta, schema.tipo_de_banco]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};