import { connection } from "../index.js";

export const createQualification = async (uuid, uuid_calificante, uuid_calificado, schema) => {
  try {
      const [statement] = await connection.query(
          `INSERT INTO calificacion (id, id_calificante, id_calificado, puntaje) VALUES (?, ?, ?, ?)`,
          [uuid, uuid_calificante, uuid_calificado, schema.puntaje]
      );

      return statement; 
    
  } catch (error) {
      throw new Error(error.message); 
  }
};

export const getQualificationUserSession = async (uuid_calificante) => {
  try {
      const [statement] = await connection.query(
          `SELECT * FROM calificacion WHERE id_calificante = ?`,
          [uuid_calificante]
      );

      return statement; 
    
  } catch (error) {
      throw new Error(error.message); 
  }
};

export const getQualificationByUserId = async (id_calificante) => {
  try {

      const [statement] = await connection.query(
          `SELECT * FROM calificacion WHERE id_calificante = ?`,
          [id_calificante]
      );

      return statement;  
    
  } catch (error) {
      throw new Error(error.message); 
  }
};


export const updateQualification = async (uuid, schema) => {
  try {
      const [statement] = await connection.query(
          `UPDATE calificacion SET puntaje = ? WHERE id = ?`,
          [schema.puntaje, uuid]
      );

      return statement;
    
  } catch (error) {
      throw new Error(error.message);
  }
};



 