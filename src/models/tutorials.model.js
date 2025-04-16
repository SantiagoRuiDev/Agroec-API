import pool from "../database/index.js";

export const getAllCategories = async () => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT * FROM categoria GROUP BY id`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const getTutorialById = async (id) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t WHERE t.id = ?`,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getTutorialsByCategories = async (category, visibility = 1) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ? AND t.visible = ? GROUP BY t.id ORDER BY t.fecha_creacion DESC`,
      [category, visibility]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getTutorialsByCategoriesRaw = async (category) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ? GROUP BY t.id ORDER BY t.fecha_creacion DESC`,
      [category]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteTutorialByCategory = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM tutoriales WHERE id_categoria = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const deleteTutorial = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM tutoriales WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const setVisibility = async (uuid, visibility) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE tutoriales SET visible = ? WHERE id = ?`,
      [visibility, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const createTutorial = async (uuid, category_uuid, schema) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO tutoriales (id, titulo, url_video, id_categoria, nuevo, visible) VALUES (?,?,?,?,?,?)`,
      [uuid, schema.titulo, schema.url_video, category_uuid, schema.nuevo, schema.visible]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const createCategory = async (uuid, title) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `INSERT INTO categoria (id, imagen, nombre) VALUES (?,"not image",?)`,
      [uuid, title]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const deleteCategoryById = async (uuid) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `DELETE FROM categoria WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
export const setCategoryImage = async (uuid, image) => {
  const db = await pool.getConnection();
  try {
    const [statement] = await db.query(
      `UPDATE categoria SET imagen = ? WHERE id = ?`,
      [image, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};
