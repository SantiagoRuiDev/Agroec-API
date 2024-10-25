import { connection } from "../index.js";

export const createQualityParam = async (param_id, user_id, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO parametros_calidad(id, id_usuario, nombre, max_calidad, min_calidad) VALUES (?,?,?,?,?)`,
      [param_id, user_id, schema.nombre, schema.max, schema.min]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateQualityParam = async (param_id, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE parametros_calidad SET nombre = ?, max_calidad = ?, min_calidad = ? WHERE id = ?`,
      [schema.nombre, schema.max, schema.min, param_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createQualityParamForCondition = async (
  contain_id,
  param_id,
  condition_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO condicion_contiene_parametros(id, id_parametros, id_condicion) VALUES (?,?,?)`,
      [contain_id, param_id, condition_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const createQualityParamForLicitation = async (
  param_id,
  licitation_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO licitacion_contiene_calidad(id_parametros, id_licitacion) VALUES (?,?)`,
      [param_id, licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createQualityParamForSale = async (
  param_id,
  sale_id
) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO venta_contiene_calidad(id_parametros, id_venta) VALUES (?,?)`,
      [param_id, sale_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getQualityParamForLicitation = async (
  licitation_id
) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM licitacion_contiene_calidad WHERE id_licitacion = ?`,
      [licitation_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteQualityParamForLicitation = async (
  licitation_id
) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM licitacion_contiene_calidad WHERE id_licitacion = ?`,
      [licitation_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const getQualityParamByUser = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM parametros_calidad WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteQualityParam = async (param_id, user_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM parametros_calidad WHERE id = ? AND id_usuario = ?`,
      [param_id, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteQualityParamForSale = async (param_id, sale_id, user_id) => {
  try {
    await connection.query(
      `DELETE FROM venta_contiene_calidad WHERE id_venta = ? AND id_parametros = ?`,
      [sale_id, param_id]
    );
    const [statement] = await connection.query(
      `DELETE FROM parametros_calidad WHERE id = ? AND id_usuario = ?`,
      [param_id, user_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteQualityParamForCondition = async (param_id) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM condicion_contiene_parametros WHERE id_parametros = ?`,
      [param_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};