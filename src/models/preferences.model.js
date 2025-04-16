import pool from "../database/index.js";

export const getPreferencesByUser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM preferencias WHERE id_usuario = ?`,
      [uuid]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getPreferenceById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM preferencias WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const deletePreferenceById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    await db.query(
      `DELETE FROM preferencia_contiene_parametros WHERE id_preferencia = ?`,
      [uuid]
    );
    const [statement] = await db.query(
      `DELETE FROM preferencias WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};



export const deletePreferenceByUser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT id FROM preferencias WHERE id_usuario = ?`,
      [uuid]
    );
    
    const preferencesIds = statement.map((i) => i.id);

    if (preferencesIds.length > 0) {
      await db.query(
        `DELETE FROM preferencia_contiene_parametros WHERE id_preferencia IN (?)`,
        [preferencesIds]
      );
      const [deletedRows] = await db.query(
        `DELETE FROM preferencias WHERE id IN (?)`,
        [preferencesIds]
      );
      return deletedRows.affectedRows;
    }

    return 0;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const uploadSheetByPreference = async (uuid, table_url) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE preferencias SET url_castigos = ? WHERE id = ?`,
      [table_url, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createPreferencesByUser = async (uuid, uuid_user, schema, table_url) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO preferencias(id, id_usuario, id_producto, url_castigos, parametros) VALUES (?,?,?,?,?)`,
      [uuid, uuid_user, schema.id_producto, table_url, schema.parametros]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const userPreferenceAlreadyExist = async (uuid_user, uuid_product) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM preferencias WHERE id_usuario = ? AND id_producto = ?`,
      [uuid_user, uuid_product]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
}