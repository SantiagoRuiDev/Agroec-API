import pool from "../database/index.js";

export const createAccount = async (uuid, schema, state) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO usuarios
      (id, tipo_identificacion, numero_identificacion, correo, clave, provincia, canton, parroquia, acepto_terminos, direccion, ubicacion_google_maps, telefono, estado, ubicacion_longitud, ubicacion_latitud) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        uuid,
        schema.tipo_identificacion,
        schema.numero_identificacion,
        schema.correo,
        schema.clave,
        schema.provincia,
        schema.canton,
        schema.parroquia,
        schema.acepto_terminos,
        schema.direccion,
        schema.ubicacion,
        schema.telefono,
        state,
        schema.longitud,
        schema.latitud
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getAccountById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [
      uuid,
    ]);

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getAccountByDocument = async (documento) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM usuarios WHERE numero_identificacion = ?`,
      [documento]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getAccountByEmail = async (correo) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM usuarios WHERE correo = ?`,
      [correo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getMultiuserByEmail = async (correo) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM multiusuarios WHERE correo = ?`,
      [correo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const setState = async (uuid, state) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE usuarios SET estado = ? WHERE id = ?`,
      [state, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const accountIsBlocked = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM usuarios WHERE estado = 2 AND id = ?`,
      [uuid]
    );

    return statement.length > 0;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateAccount = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE usuarios SET tipo_identificacion = ?, numero_identificacion = ?, correo = ?, clave = ?, provincia = ?, parroquia = ?, canton = ?, direccion = ?, ubicacion_google_maps = ?, ubicacion_longitud = ?, ubicacion_latitud = ?, telefono = ? 
      WHERE id = ?`,
      [
        schema.tipo_identificacion,
        schema.numero_identificacion,
        schema.correo,
        schema.clave,
        schema.provincia,
        schema.parroquia,
        schema.canton,
        schema.direccion,
        schema.ubicacion_google_maps,
        schema.longitud,
        schema.latitud,
        schema.telefono,
        uuid,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateAccountPassword = async (uuid, clave) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE usuarios SET clave = ?
      WHERE id = ?`,
      [clave, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
