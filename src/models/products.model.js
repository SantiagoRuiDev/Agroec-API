import { connection } from "../index.js";

export const getPriceAnalyticByProduct = async (product) => {
  try {
    const [statement] = await connection.query(
      `
      WITH precios AS (
        -- Seleccionamos los precios de producto_licitar
        SELECT 
            pl.precio, 
            u.provincia,
            pl.fecha_publicacion
        FROM producto_licitar pl
        INNER JOIN usuarios u ON pl.id_usuario = u.id
        INNER JOIN productos p ON pl.id_producto = p.id
        WHERE p.nombre = ?

        UNION ALL

        -- Seleccionamos los precios de producto_vender
        SELECT 
            pv.precio, 
            u.provincia,
            pv.fecha_publicacion
        FROM producto_vender pv
        INNER JOIN usuarios u ON pv.id_usuario = u.id
        INNER JOIN productos p ON pv.id_producto = p.id
        WHERE p.nombre = ?
    ),
    precios_ordenados AS (
        -- Ordenamos los precios por provincia y fecha_publicacion descendente
        SELECT 
            provincia,
            precio,
            fecha_publicacion,
            LAG(precio) OVER (PARTITION BY provincia ORDER BY fecha_publicacion DESC) AS precio_anterior
        FROM precios
    ),
    precios_agrupados AS (
        -- Calculamos el precio mínimo, máximo y el último precio registrado
        SELECT 
            provincia, 
            MIN(precio) AS precio_minimo,
            MAX(precio) AS precio_maximo,
            FIRST_VALUE(precio) OVER (PARTITION BY provincia ORDER BY fecha_publicacion DESC) AS ultimo_precio,
            MAX(precio_anterior) AS precio_anterior
        FROM precios_ordenados
        GROUP BY provincia
    )
    SELECT 
        provincia, 
        precio_minimo, 
        precio_maximo, 
        ultimo_precio,
        CASE 
            WHEN ultimo_precio >= precio_anterior THEN 'Subida'
            WHEN ultimo_precio < precio_anterior THEN 'Bajada'
            WHEN ultimo_precio = precio_maximo THEN 'Max'
            ELSE 'Estable'
        END AS tendencia
    FROM precios_agrupados;
`,
      [product, product]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllProducts = async () => {
  try {
    const [statement] = await connection.query(`SELECT * FROM productos`);

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsByPreferences = async (user_id) => {
  try {
    const [statement] = await connection.query(
      `SELECT p.*, pf.id as id_preferencia FROM productos p INNER JOIN preferencias pf ON pf.id_producto = p.id WHERE pf.id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduct = async (uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO productos (id, nombre, imagen) VALUES (?, ?, ?) `,
      [uuid, schema.nombre, schema.imagen]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      "DELETE FROM productos WHERE id = ?",
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
