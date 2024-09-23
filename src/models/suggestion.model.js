import { connection } from "../index.js";

export const createSuggestion = async (uuid, producto, cantidad) => {
    try {
      const [statement] = await connection.query(
        `INSERT INTO sugerir_producto (id, id_usuario, producto, cantidad) VALUES (?, ?, ?, ?) `,[uuid,"2e1ceac2-67cb-4ab8-8acb-d387f9fc4dff",producto, cantidad]);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getSuggestions = async () => {
    try {
      const [statement] = await connection.query(
        `SELECT * FROM sugerir_producto`);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };