import { connection } from "../index.js";

export const getPreferencesByUser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM preferencias WHERE id_usuario = ?`,
      [uuid]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getPreferenceById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM preferencias WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deletePreferenceById = async (uuid) => {
  try {
    await connection.query(
      `DELETE FROM preferencia_contiene_parametros WHERE id_preferencia = ?`,
      [uuid]
    );
    const [statement] = await connection.query(
      `DELETE FROM preferencias WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const deletePreferenceByUser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT id FROM preferencias WHERE id_usuario = ?`,
      [uuid]
    );
    
    const preferencesIds = statement.map((i) => i.id);

    if (preferencesIds.length > 0) {
      await connection.query(
        `DELETE FROM preferencia_contiene_parametros WHERE id_preferencia IN (?)`,
        [preferencesIds]
      );
      const [deletedRows] = await connection.query(
        `DELETE FROM preferencias WHERE id IN (?)`,
        [preferencesIds]
      );
      return deletedRows.affectedRows;
    }

    return 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadSheetByPreference = async (uuid, table_url) => {
  try {
    const [statement] = await connection.query(
      `UPDATE preferencias SET url_castigos = ? WHERE id = ?`,
      [table_url, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPreferencesByUser = async (uuid, uuid_user, schema, table_url) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO preferencias(id, id_usuario, id_producto, url_castigos, parametros) VALUES (?,?,?,?,?)`,
      [uuid, uuid_user, schema.id_producto, table_url, schema.parametros]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userPreferenceAlreadyExist = async (uuid_user, uuid_product) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM preferencias WHERE id_usuario = ? AND id_producto = ?`,
      [uuid_user, uuid_product]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
}