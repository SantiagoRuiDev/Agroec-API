import { connection } from "../index.js";

export const insertCode = async (uuid, code, user_id) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO codigos_telefonicos(id,codigo,id_usuario) VALUES (?,?,?)`,
      [uuid, code, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCode = async (codigo) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM codigos_telefonicos WHERE codigo = ?`,
      [codigo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCode = async (codigo) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM codigos_telefonicos WHERE codigo = ?`,
      [codigo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteCodeByUser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM codigos_telefonicos WHERE id_usuario = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
