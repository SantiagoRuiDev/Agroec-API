import pool from "../database/index.js";

export const createAssociation = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO asociacion
      (id, nombre) 
      VALUES(?,?)`,
      [uuid, schema.nombre]
    );
    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};