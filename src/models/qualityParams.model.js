import pool from "../database/index.js";


export const createConditionQualityParam = async (param_id, user_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO parametros_calidad(id, id_usuario, nombre, max_calidad, min_calidad) VALUES (?,?,?,?,?)`,
      [param_id, user_id, schema.nombre, schema.max_calidad, schema.min_calidad]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createQualityParam = async (param_id, user_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO parametros_calidad(id, id_usuario, nombre, max_calidad, min_calidad) VALUES (?,?,?,?,?)`,
      [param_id, user_id, schema.nombre, schema.max, schema.min]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateQualityParam = async (param_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE parametros_calidad SET nombre = ?, max_calidad = ?, min_calidad = ? WHERE id = ?`,
      [schema.nombre, schema.max, schema.min, param_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createQualityParamForPreference = async (
  contain_id,
  param_id,
  preference_id
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO preferencia_contiene_parametros(id, id_parametros, id_preferencia) VALUES (?,?,?)`,
      [contain_id, param_id, preference_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createQualityParamForCondition = async (
  contain_id,
  param_id,
  condition_id
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO condicion_contiene_parametros(id, id_parametros, id_condicion) VALUES (?,?,?)`,
      [contain_id, param_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createQualityParamForLicitation = async (
  param_id,
  licitation_id
) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO licitacion_contiene_calidad(id_parametros, id_licitacion) VALUES (?,?)`,
      [param_id, licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createQualityParamForSale = async (param_id, sale_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO venta_contiene_calidad(id_parametros, id_venta) VALUES (?,?)`,
      [param_id, sale_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getQualityParamForLicitation = async (licitation_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM licitacion_contiene_calidad WHERE id_licitacion = ?`,
      [licitation_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteQualityParamForLicitation = async (licitation_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM licitacion_contiene_calidad WHERE id_licitacion = ?`,
      [licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getQualityParamByUser = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM parametros_calidad WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteQualityParam = async (param_id, user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM parametros_calidad WHERE id = ? AND id_usuario = ?`,
      [param_id, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteQualityParamForSale = async (param_id, sale_id, user_id) => {
  const db = await pool.getConnection();
  try {
    await db.query(
      `DELETE FROM venta_contiene_calidad WHERE id_venta = ? AND id_parametros = ?`,
      [sale_id, param_id]
    );
    const [statement] = await db.query(
      `DELETE FROM parametros_calidad WHERE id = ? AND id_usuario = ?`,
      [param_id, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteQualityParamForCondition = async (param_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM condicion_contiene_parametros WHERE id_parametros = ?`,
      [param_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getQualityParamsFromSale = async (sale_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT 
      pc.*
      FROM parametros_calidad pc
      INNER JOIN venta_contiene_calidad vcc ON vcc.id_parametros = pc.id
      WHERE vcc.id_venta = ?`,
      [sale_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getQualityParamFromLicitation = async (licitation_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT 
      pc.*
      FROM parametros_calidad pc 
      INNER JOIN licitacion_contiene_calidad lcc ON pc.id = lcc.id_parametros
      WHERE lcc.id_licitacion = ?`,
      [licitation_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};