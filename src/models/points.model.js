import { connection } from "../index.js";

export const createPoint = async (point_id, user_id, schema) => {
    try {
        const [statement] = await connection.query(
          `INSERT INTO puntos_recepcion(id, id_usuario, nombre, direccion, ubicacion_google_maps) VALUES (?,?,?,?,?)`,
          [point_id, user_id, schema.nombre, schema.direccion, schema.ubicacion_google_maps]
        );
    
        return statement.affectedRows;
      } catch (error) {
        throw new Error(error.message);
      }
}

export const getPoints = async (user_id) => {
  try {
      const [statement] = await connection.query(
        `SELECT id, nombre, direccion, ubicacion_google_maps FROM puntos_recepcion WHERE id_usuario = ?`,
        [user_id]
      );
  
      return statement;
    } catch (error) {
      throw new Error(error.message);
    }
}
