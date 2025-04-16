import pool from "../database/index.js";

export const getMultiuserById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT m.nombre, m.correo, m.id_rol FROM multiusuarios m WHERE m.id = ?`,
      [uuid]
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
      `SELECT m.nombre, m.correo, m.id_rol FROM multiusuarios m WHERE m.correo = ?`,
      [correo]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getMultiuserRoleByUser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM roles r INNER JOIN multiusuarios m ON m.id_rol = r.id WHERE m.id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getMultiusersByUser = async (uuid_user) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM multiusuarios m WHERE m.id_usuario = ?`,
      [uuid_user]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getMultiusersRoles = async () => {
  try {
    const [statement] = await db.query(`SELECT * FROM roles`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createMultiuser = async (uuid, uuid_user, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO multiusuarios (id, id_usuario, id_rol, nombre, correo, clave) VALUES (?,?,?,?,?,?)`,
      [uuid, uuid_user, schema.rol, schema.nombre, schema.correo, schema.clave]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteMultiuser = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM multiusuarios WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const editMultiuserWithoutPassword = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE multiusuarios SET id_rol = ?, nombre = ?, correo = ? WHERE id = ?`,
      [schema.rol, schema.nombre, schema.correo, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const editMultiuserWithPassword = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE multiusuarios SET id_rol = ?, nombre = ?, correo = ?, clave = ? WHERE id = ?`,
      [schema.rol, schema.nombre, schema.correo, schema.clave, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
