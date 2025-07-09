import pool from "../database/index.js";

export const createPoint = async (point_id, user_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO puntos_recepcion(id, id_usuario, nombre, direccion, ubicacion_google_maps, ubicacion_longitud, ubicacion_latitud) VALUES (?,?,?,?,?,?,?)`,
      [
        point_id,
        user_id,
        schema.nombre,
        schema.direccion,
        schema.ubicacion_google_maps,
        schema.ubicacion_longitud,
        schema.ubicacion_latitud,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPointById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT id, nombre, direccion, ubicacion_google_maps, ubicacion_longitud, ubicacion_latitud FROM puntos_recepcion WHERE id = ?`,
      [uuid]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPoints = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT id, nombre, direccion, ubicacion_google_maps, ubicacion_longitud, ubicacion_latitud FROM puntos_recepcion WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePoint = async (user_id, point_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM puntos_recepcion WHERE id_usuario = ? AND id = ?`,
      [user_id, point_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePointsByUser = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM puntos_recepcion WHERE id_usuario = ?`,
      [user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
