import { connection } from "../index.js";

export const createQualification = async (uuid, uuid_calificante, uuid_calificado, uuid_orden, schema) => {
  try {
      const [statement] = await connection.query(
          `INSERT INTO calificacion (id, id_calificante, id_calificado, id_orden, puntaje) VALUES (?, ?, ?, ?, ?)`,
          [uuid, uuid_calificante, uuid_calificado, uuid_orden, schema.puntaje]
      );

      return statement; 
    
  } catch (error) {
      throw new Error(error.message); 
  }
};

export const getQualificationUserSession = async (uuid_usuario) => {
  try {
      const [statement] = await connection.query(
          `SELECT AVG(c.puntaje) AS promedio_calificacion, COUNT(*) AS total_calificaciones FROM calificacion c WHERE c.id_calificado = ?`,
          [uuid_usuario]
      );

      return statement[0]; 
    
  } catch (error) {
      throw new Error(error.message); 
  }
};

export const getQualificationByUserId = async (id_calificado) => {
  try {

      const [statement] = await connection.query(
          `SELECT * FROM calificacion WHERE id_calificado = ?`,
          [id_calificado]
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



 