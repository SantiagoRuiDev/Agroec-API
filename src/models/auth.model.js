import { connection } from "../index.js";

export const createAccount = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO usuarios
      (id, nombre, apellido, tipo_identificacion, numero_identificacion, correo, clave, provincia, canton, acepto_terminos, direccion, ubicacion_google_maps, telefono) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [uuid, schema.nombre, schema.apellido, schema.tipo_identificacion, schema.numero_identificacion, schema.correo, schema.clave, schema.provincia, schema.canton, schema.acepto_terminos, schema.direccion, schema.ubicacion, schema.telefono]
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
}


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
}

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
}