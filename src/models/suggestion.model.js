import pool from "../database/index.js";

export const createSuggestion = async (uuid, uuid_user, producto, cantidad) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO sugerir_producto (id, id_usuario, id_producto, cantidad) VALUES (?, ?, ?, ?) `,
      [uuid, uuid_user, producto, cantidad]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getSuggestions = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM sugerir_producto`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getProducts = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM productos_listados`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const enableProductById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE productos_listados SET estado = 1 WHERE id = ?`, [id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const disableProductById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE productos_listados SET estado = 0 WHERE id = ?`, [id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
