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

export const getTutorialsByCategories = async (category) => {
  try {
    const [statement] = await connection.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ? GROUP BY t.id`,
      [category]
    );

    return statement;
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
export const createTutorial = async (uuid, category_uuid, schema) => {
  try {
    const [statement] = await connection.query(
      `INSERT INTO tutoriales (id, titulo, url_video, id_categoria) VALUES (?,?,?,?)`,
      [uuid, schema.titulo, schema.url_video, category_uuid]
    );

    return statement.affectedRows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const createCategory = async (uuid, title) => {
  try {
    const [statement] = await connection.query(
      `INSERTO INTO categoria (id, imagen, nombre) VALUES (?,null,?)`,
      [uuid, title]
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
