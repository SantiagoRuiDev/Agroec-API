import { connection } from "../index.js";

export const getAllProducts = async () => {
    try {
      const [statement] = await connection.query(
        `SELECT * FROM productos`);
  
      return statement;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };