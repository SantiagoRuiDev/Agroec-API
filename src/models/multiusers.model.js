import pool from "../database/index.js";

export const getMultiuserByRole = async (identifier) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT m.nombre, m.correo, m.id_rol FROM multiusuarios m WHERE m.id_rol = ?`,
      [identifier]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
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
      `SELECT r.*, m.nombre, m.correo FROM roles r INNER JOIN multiusuarios m ON m.id_rol = r.id WHERE m.id = ?`,
      [uuid]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getRoleById = async (identifier) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM roles WHERE id = ?`,
      [identifier]
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
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(`SELECT * FROM roles`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createRole = async (identifier) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO roles (id) VALUES (?)`,
      [identifier]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateRole = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE roles SET 
        modulo_billetera = ?, 
        modulo_gestion = ?, 
        modulo_multiusuarios = ?, 
        modulo_perfil = ?, 
        modulo_home = ?, 
        modulo_notificaciones = ?, 
        modulo_insumos = ?, 
        modulo_garantias = ?, 
        modulo_ordenes = ?,
        permiso_licitaciones = ?, 
        permiso_pagar_garantia = ?, 
        permiso_pagar = ?, 
        permiso_productos_interes = ?, 
        permiso_aceptar_propuesta = ?, 
        permiso_enviar_propuesta = ?, 
        permiso_estados_finales = ?
      WHERE id = ?`,
      [
        schema.modulo_billetera,
        schema.modulo_gestion,
        schema.modulo_multiusuarios,
        schema.modulo_perfil,
        schema.modulo_home,
        schema.modulo_notificaciones,
        schema.modulo_insumos,
        schema.modulo_garantias,
        schema.modulo_ordenes,
        schema.permiso_licitaciones,
        schema.permiso_pagar_garantia,
        schema.permiso_pagar,
        schema.permiso_productos_interes,
        schema.permiso_aceptar_propuesta,
        schema.permiso_enviar_propuesta,
        schema.permiso_estados_finales,
        uuid
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release();
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

export const deleteRole = async (identifier) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM roles WHERE id = ?`,
      [identifier]
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
