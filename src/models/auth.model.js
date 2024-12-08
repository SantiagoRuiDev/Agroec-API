import { connection } from "../index.js";

export const createAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO usuarios
      (id, tipo_identificacion, numero_identificacion, correo, clave, provincia, canton, parroquia, acepto_terminos, direccion, ubicacion_google_maps, telefono) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAccountById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM usuarios WHERE id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAccountByDocument = async (documento) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM usuarios WHERE numero_identificacion = ?`,
      [documento]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAccountByEmail = async (correo) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM usuarios WHERE correo = ?`,
      [correo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMultiuserByEmail = async (correo) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM multiusuarios WHERE correo = ?`,
      [correo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setState = async (uuid, state) => {
  try {
    const [statement] = await connection.query(
      `UPDATE usuarios SET estado = ? WHERE id = ?`,
      [state, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const accountIsBlocked = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM usuarios WHERE estado = 0 AND id = ?`,
      [uuid]
    );

    return statement.length > 0;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE usuarios SET tipo_identificacion = ?, numero_identificacion = ?, correo = ?, clave = ?, provincia = ?, parroquia = ?, canton = ?, direccion = ?, ubicacion_google_maps = ?, telefono = ? 
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
        schema.telefono,
        uuid,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
