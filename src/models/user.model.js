import pool from "../database/index.js";

export const getAll = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT u.*, 
      COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil, pc.tipo_perfil) AS tipo_perfil,
      COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre, pc.razon_social) AS nombre
      FROM usuarios u
      LEFT JOIN perfil_comprador pc ON pc.id_usuario = u.id
      LEFT JOIN perfil_agricultor pa ON pa.id_usuario = u.id
      LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = u.id
      LEFT JOIN perfil_comerciante pca ON pca.id_usuario = u.id
      LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = u.id
      WHERE u.id != 'Sistema';`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT u.*, 
      COALESCE(pa.tipo_perfil, pac.tipo_perfil, pca.tipo_perfil, pcaq.tipo_perfil, pc.tipo_perfil) AS tipo_perfil,
      COALESCE(pa.modulo_insumos, pac.modulo_insumos, pca.modulo_insumos, pc.modulo_insumos) AS modulo_insumos_activado,
      COALESCE(pa.nombre, pac.nombre, pca.nombre, pcaq.nombre, pc.razon_social) AS nombre
      FROM usuarios u
      LEFT JOIN perfil_comprador pc ON pc.id_usuario = u.id
      LEFT JOIN perfil_agricultor pa ON pa.id_usuario = u.id
      LEFT JOIN perfil_asociacion_agricola pac ON pac.id_usuario = u.id
      LEFT JOIN perfil_comerciante pca ON pca.id_usuario = u.id
      LEFT JOIN perfil_comerciante_agroquimicos pcaq ON pcaq.id_usuario = u.id
      WHERE u.id = ?;`, [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const deleteById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM usuarios WHERE id = ?;`, [id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getByStatus = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT count(*) AS cantidad_usuarios_pendientes FROM usuarios u WHERE (u.estado = 0 OR u.estado = 3) AND u.id != 'Sistema'`
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const setStateByUserId = async (id, state) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE usuarios u SET estado = ?
      WHERE u.id = ?;`,
      [state, id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const setInputPermissionByUserId = async (id, state) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const updates = [
      conn.query(
        `UPDATE perfil_comprador SET modulo_insumos = ? WHERE id_usuario = ?`,
        [state, id]
      ),
      conn.query(
        `UPDATE perfil_agricultor SET modulo_insumos = ? WHERE id_usuario = ?`,
        [state, id]
      ),
      conn.query(
        `UPDATE perfil_comerciante SET modulo_insumos = ? WHERE id_usuario = ?`,
        [state, id]
      ),
      conn.query(
        `UPDATE perfil_asociacion_agricola SET modulo_insumos = ? WHERE id_usuario = ?`,
        [state, id]
      ),
    ];

    const results = await Promise.all(updates);

    await conn.commit();
    conn.release();

    // Retorna la cantidad total de filas afectadas (normalmente solo una)
    const totalAffected = results.reduce(
      (sum, [res]) => sum + res.affectedRows,
      0
    );
    return totalAffected;
  } catch (error) {
    await conn.rollback();
    conn.release();
    throw new Error(`Error actualizando permiso: ${error.message}`);
  }
};
export const updateById = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
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
  } finally {
    db.release(); // Muy importante
  }
};
