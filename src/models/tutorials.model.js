import { connection } from "../index.js";

export const getAllCategories = async () => {
    try {
      const [statement] = await connection.query(
        `SELECT *  FROM categoria`);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const getTutorialsByCategories = async (category) => {
  try {
    const [statement] = await connection.query(
      `SELECT t.id, t.titulo, t.url_video, t.nuevo FROM tutoriales t INNER JOIN categoria c ON t.id_categoria = c.id WHERE c.id = ?`,
      [category]
    );

    return statement;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


