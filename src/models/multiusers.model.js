import { connection } from "../index.js";

export const getMultiuserById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT m.nombre, m.correo, m.id_rol FROM multiusuarios m WHERE m.id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMultiuserRoleByUser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM roles r INNER JOIN multiusuarios m ON m.id_rol = r.id WHERE m.id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMultiusersByUser = async (uuid_user) => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM multiusuarios m WHERE m.id_usuario = ?`,
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMultiusersRoles = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM roles`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createMultiuser = async (uuid, uuid_user, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO multiusuarios (id, id_usuario, id_rol, nombre, correo, clave) VALUES (?,?,?,?,?,?)`,
      [uuid, uuid_user, schema.rol, schema.nombre, schema.correo, schema.clave]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const deleteMultiuser = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM multiusuarios WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editMultiuserWithoutPassword = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `UPDATE multiusuarios SET id_rol = ?, nombre = ?, correo = ? WHERE id = ?`,
      [schema.rol, schema.nombre, schema.correo, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editMultiuserWithPassword = async (uuid, schema) => {
    try {
      const [statement] = await connection.query(
        `UPDATE multiusuarios SET id_rol = ?, nombre = ?, correo = ?, clave = ? WHERE id = ?`,
        [schema.rol, schema.nombre, schema.correo, schema.clave, uuid]
      );
  
      return statement.affectedRows;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  