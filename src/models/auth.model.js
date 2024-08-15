import { connection } from "../index.js";

export const createAccount = async (schema) => {
    try {
        const [statement] = await connection.query()
        
    } catch (error) {
        throw new Error(error.message);
    }
}