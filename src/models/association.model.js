import { connection } from "../index.js";

export const createAssociation = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO asociacion
      (id, nombre) 
      VALUES(?,?)`,
      [uuid, schema.nombre]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};