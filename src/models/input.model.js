import pool from "../database/index.js";

export const createInput = async (uuid, uuid_user, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO insumos
      (id, id_usuario,categoria_insumo, nombre_comercial, precio_agroec, precio_mas_iva, incluido_iva ,precio_punto_venta, stock ,composicion ,clase ,tipo_formula	 ,titular ,clasificacion	 ,instrucciones_de_uso ,epoca_intervalo ,intervalo_entrada, link, atencion) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid,
        uuid_user,
        schema.categoria_insumo,
        schema.nombre_comercial,
        schema.precio_agroec,
        schema.precio_mas_iva,
        schema.incluido_iva,
        schema.precio_punto_venta,
        schema.stock,
        schema.composicion,
        schema.clase,
        schema.tipo_formula,
        schema.titular,
        schema.clasificacion,
        schema.instrucciones_de_uso,
        schema.modo_aplicacion,
        schema.intervalo_entrada,
        schema.link,
        schema.atencion,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const insertImage = async (image_id, input_id, url_imagen) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO insumos_imagenes (id, id_insumo, url_imagen) VALUES (?,?,?)`,
      [image_id, input_id, url_imagen]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteImage = async (image_id, input_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM insumos_imagenes WHERE id = ? AND id_insumo = ?`,
      [image_id, input_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const updateInput = async (input_id, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE insumos SET categoria_insumo = ?, nombre_comercial = ?, precio_agroec = ?,precio_mas_iva = ? ,incluido_iva = ? ,precio_punto_venta = ?, stock = ? ,composicion = ?,clase = ?,tipo_formula = ? ,titular = ? ,clasificacion = ? ,instrucciones_de_uso = ?,epoca_intervalo = ?,intervalo_entrada = ?, link = ?, atencion = ?  WHERE id = ?`,
      [
        schema.categoria_insumo,
        schema.nombre_comercial,
        schema.precio_agroec,
        schema.precio_mas_iva,
        schema.incluido_iva,
        schema.precio_punto_venta,
        schema.stock,
        schema.composicion,
        schema.clase,
        schema.tipo_formula,
        schema.titular,
        schema.clasificacion,
        schema.instrucciones_de_uso,
        schema.modo_aplicacion,
        schema.intervalo_entrada,
        schema.link,
        schema.atencion,
        input_id,
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const updateInputStockById = async (input_id, stock) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE insumos SET stock = ?  WHERE id = ?`,
      [
        stock,
        input_id
      ]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteInput = async (input_id) => {
  const db = await pool.getConnection();
  try {
    await db.query(`DELETE FROM insumos_imagenes WHERE id_insumo = ?`, [
      input_id,
    ]);
    const [statement] = await db.query(
      `DELETE FROM insumos WHERE id = ?`,
      [input_id]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const insertInputImage = async (image_id, input_id, url_imagen) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO input (id, id_insumo, url_imagen) VALUES (?,?,?)`,
      [image_id, input_id, url_imagen]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getInputById = async (input_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM insumos WHERE id = ?`,
      [input_id]
    );

    const [images] = await db.query(
      `SELECT * FROM insumos_imagenes WHERE id_insumo = ?`,
      [statement[0].id]
    );

    return {
      input: statement[0],
      images: images,
    };
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getInputByCreatorId = async (user_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM insumos WHERE id_usuario = ?`,
      [user_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getAllInputsByCategory = async (category_id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT i.*,
       (SELECT im.url_imagen 
        FROM insumos_imagenes im 
        WHERE im.id_insumo = i.id 
        ORDER BY im.id ASC 
        LIMIT 1) AS primera_imagen
        FROM insumos i 
        WHERE i.categoria_insumo = ?
        ORDER BY i.creado DESC
      `,
      [category_id]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getInputCategories = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM categoria_insumos`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createCategory = async (uuid, icon) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO categoria_insumos (id, icono) VALUES (?,?)`, [uuid, icon]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const setCategoryImage = async (uuid, icon) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE categoria_insumos SET icono = ? WHERE id = ?`, [icon, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const deleteCategory = async (category_id) => {
  const db = await pool.getConnection();
  try {
    // 1. Obtener los insumos relacionados con la categoría
    const [insumos] = await db.query(
      `SELECT id FROM insumos WHERE categoria_insumo = ?`,
      [category_id]
    );

    const insumoIds = insumos.map((i) => i.id);

    if (insumoIds.length > 0) {
      // 2. Eliminar las imágenes de esos insumos
      await db.query(
        `DELETE FROM insumos_imagenes WHERE id_insumo IN (?)`,
        [insumoIds]
      );

      // 3. Eliminar los insumos
      await db.query(
        `DELETE FROM insumos WHERE id IN (?)`,
        [insumoIds]
      );
    }

    // 4. Eliminar la categoría
    const [result] = await db.query(
      `DELETE FROM categoria_insumos WHERE id = ?`,
      [category_id]
    );

    return result.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};