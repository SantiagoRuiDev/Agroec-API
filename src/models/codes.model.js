import pool from "../database/index.js";

export const insertCode = async (uuid, code, user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO codigos_telefonicos(id,codigo,id_usuario) VALUES (?,?,?)`,
      [uuid, code, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getCode = async (codigo) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM codigos_telefonicos WHERE codigo = ?`,
      [codigo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteCode = async (codigo) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM codigos_telefonicos WHERE codigo = ?`,
      [codigo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const deleteCodeByUser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM codigos_telefonicos WHERE id_usuario = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
