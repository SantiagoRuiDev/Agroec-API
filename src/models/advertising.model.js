import pool from "../database/index.js";

export const createAdvertising = async (uuid_ads, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "INSERT INTO publicidades (id, nombre, url) VALUES (?, ?, ?)",
      [uuid_ads, schema.nombre, schema.url]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getAllAdvertisings = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "SELECT * FROM publicidades GROUP BY id"
    );
    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateImageById = async (imageUrl, uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE publicidades SET imagen = ? WHERE id = ?",
      [imageUrl, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteAdvertisingById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "DELETE FROM publicidades WHERE id = ?",
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
