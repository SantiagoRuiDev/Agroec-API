import pool from "../database/index.js";

export const createQualification = async (uuid, uuid_calificante, uuid_calificado, uuid_orden, schema) => {
  const db = await pool.getConnection();
  try {
      const [statement] = await db.query(
          `INSERT INTO calificacion (id, id_calificante, id_calificado, id_orden, puntaje) VALUES (?, ?, ?, ?, ?)`,
          [uuid, uuid_calificante, uuid_calificado, uuid_orden, schema.puntaje]
      );

      return statement; 
    
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getQualificationUserSession = async (uuid_usuario) => {
  const db = await pool.getConnection();
  try {
      const [statement] = await db.query(
          `SELECT AVG(c.puntaje) AS promedio_calificacion, COUNT(*) AS total_calificaciones FROM calificacion c WHERE c.id_calificado = ?`,
          [uuid_usuario]
      );

      return statement[0]; 
    
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};

export const getQualificationByUserId = async (id_calificado) => {
  const db = await pool.getConnection();
  try {

      const [statement] = await db.query(
          `SELECT * FROM calificacion WHERE id_calificado = ?`,
          [id_calificado]
      );

      return statement;  
    
  } catch (error) {
    throw new Error(error.message);
  } finally {
    db.release(); // Muy importante
  }
};


export const updateQualification = async (uuid, schema) => {
  const db = await pool.getConnection();
  try {
      const [statement] = await db.query(
          `UPDATE calificacion SET puntaje = ? WHERE id = ?`,
          [schema.puntaje, uuid]
      );

      return statement;
    
  } catch (error) {
      throw new Error(error.message);
  }
};



 