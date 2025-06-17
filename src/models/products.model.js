import pool from "../database/index.js";

export const getPriceAnalyticByProduct = async (product) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `WITH precios_unificados AS (
  SELECT 
    pl.precio,
    pl.fecha_publicacion,
    pl.id_producto,
    u.provincia
  FROM producto_licitar pl
  INNER JOIN usuarios u ON pl.id_usuario = u.id

  UNION ALL

  SELECT 
    pv.precio,
    pv.fecha_publicacion,
    pv.id_producto,
    u.provincia
  FROM producto_vender pv
  INNER JOIN usuarios u ON pv.id_usuario = u.id
),
precios_filtrados AS (
  SELECT 
    precio,
    fecha_publicacion,
    id_producto,
    provincia,
    YEARWEEK(fecha_publicacion, 1) AS semana
  FROM precios_unificados
  WHERE id_producto = ?
)
SELECT 
  provincia,
  semana,
  AVG(precio) AS promedio
FROM precios_filtrados
GROUP BY provincia, semana
ORDER BY provincia, semana;
`,
      [product]
    );
    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getPriceByProductAndState = async (product) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `WITH precios_unificados AS (
  SELECT 
    pl.precio,
    pl.fecha_publicacion,
    pl.id_producto,
    u.provincia
  FROM producto_licitar pl
  INNER JOIN usuarios u ON pl.id_usuario = u.id

  UNION ALL

  SELECT 
    pv.precio,
    pv.fecha_publicacion,
    pv.id_producto,
    u.provincia
  FROM producto_vender pv
  INNER JOIN usuarios u ON pv.id_usuario = u.id
),
precios_con_semana AS (
  SELECT 
    precio,
    fecha_publicacion,
    id_producto,
    provincia,
    YEARWEEK(fecha_publicacion, 1) AS semana
  FROM precios_unificados
  WHERE id_producto = ?
),
ultima_semana_por_provincia AS (
  SELECT 
    provincia,
    MAX(semana) AS ultima_semana
  FROM precios_con_semana
  GROUP BY provincia
)
SELECT 
  p.provincia,
  p.semana,
  MAX(p.precio) AS max,
  MIN(p.precio) AS min
FROM precios_con_semana p
JOIN ultima_semana_por_provincia u
  ON p.provincia = u.provincia AND p.semana = u.ultima_semana
GROUP BY p.provincia, p.semana
ORDER BY p.provincia;
`,
      [product]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getUnitNameAndProduct = async (id, name) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM unidades WHERE id_producto = ? AND nombre = ?`,
      [id, name]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getProductUnitsById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM unidades WHERE id_producto = ?`,
      [id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getProductById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(`SELECT * FROM productos WHERE id = ?`, [
      id,
    ]);
    const [unidades] = await db.query(
      `SELECT * FROM unidades WHERE id_producto = ?`,
      [id]
    );

    return { ...statement[0], unidades };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getAllProducts = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM productos WHERE estado = 1`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const getAllProductsRaw = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(`SELECT * FROM productos`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getProductsByPreferences = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT p.*, pf.id as id_preferencia FROM productos p INNER JOIN preferencias pf ON pf.id_producto = p.id WHERE pf.id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteUnit = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(`DELETE FROM unidades WHERE id = ?`, [
      id,
    ]);

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createUnit = async (id, id_product, name) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO unidades (id, id_producto, nombre) VALUES (?, ?, ?) `,
      [id, id_product, name]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createProduct = async (schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO productos (id, nombre, estado) VALUES (?, ?, ?) `,
      [schema.nombre, schema.nombre, schema.estado]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateProduct = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE productos SET nombre = ?, estado = ? WHERE id = ?",
      [schema.nombre, schema.estado, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const setProductImage = async (uuid, image) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE productos SET imagen = ? WHERE id = ?",
      [image, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const enableProductById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE productos SET estado = 1 WHERE id = ?",
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const disableProductById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      "UPDATE productos SET estado = 0 WHERE id = ?",
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
