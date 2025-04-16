import pool from "../database/index.js";

export const createContact = async (contact_id, user_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO contactos(id, id_usuario, nombre, telefono, correo, cargo) VALUES (?,?,?,?,?,?)`,
      [
        contact_id,
        user_id,
        schema.nombre,
        schema.telefono,
        schema.correo,
        schema.cargo,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getContacts = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM contactos WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContact = async (contact_id, user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM contactos WHERE id = ? AND id_usuario = ?`,
      [contact_id, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteContactByUser = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM contactos WHERE id_usuario = ?`,
      [user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
