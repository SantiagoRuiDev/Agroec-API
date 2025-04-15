import { connection } from "../index.js";

export const getAllCategories = async () => {
  try {
    const [statement] = await connection.query(
      `SELECT * FROM categoria GROUP BY id`
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getTutorialById = async (id) => {
  try {
    const [statement] = await connection.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t WHERE t.id = ?`,
      [id]
    );

    return statement[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTutorialsByCategories = async (category, visibility = 1) => {
  try {
    const [statement] = await connection.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ? AND t.visible = ? GROUP BY t.id ORDER BY t.fecha_creacion DESC`,
      [category, visibility]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTutorialsByCategoriesRaw = async (category) => {
  try {
    const [statement] = await connection.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo, t.visible FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ? GROUP BY t.id ORDER BY t.fecha_creacion DESC`,
      [category]
    );

    return statement;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTutorialByCategory = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM tutoriales WHERE id_categoria = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTutorial = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM tutoriales WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setVisibility = async (uuid, visibility) => {
  try {
    const [statement] = await connection.query(
      `UPDATE tutoriales SET visible = ? WHERE id = ?`,
      [visibility, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTutorial = async (uuid, category_uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO tutoriales (id, titulo, url_video, id_categoria, nuevo, visible) VALUES (?,?,?,?,?,?)`,
      [uuid, schema.titulo, schema.url_video, category_uuid, schema.nuevo, schema.visible]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const createCategory = async (uuid, title) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO categoria (id, imagen, nombre) VALUES (?,"not image",?)`,
      [uuid, title]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteCategoryById = async (uuid) => {
  try {
    const [statement] = await connection.query(
      `DELETE FROM categoria WHERE id = ?`,
      [uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const setCategoryImage = async (uuid, image) => {
  try {
    const [statement] = await connection.query(
      `UPDATE categoria SET imagen = ? WHERE id = ?`,
      [image, uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
