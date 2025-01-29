import { connection } from "../index.js";

export const createAdvertising = async (uuid_ads, schema) => {
    try {

        const [statement] = await connection.query('INSERT INTO publicidades (id, nombre, url) VALUES (?, ?, ?)', [uuid_ads, schema.nombre, schema.url]);

        return statement.affectedRows;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllAdvertisings = async () => {
    try {

        const [statement] = await connection.query('SELECT * FROM publicidades GROUP BY id');
        return statement;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateImageById = async (imageUrl, uuid) => {    
    try {
        const [statement] = await connection.query('UPDATE publicidades SET imagen = ? WHERE id = ?', [imageUrl, uuid]);
        
        return statement.affectedRows;
    } catch (error) {
        throw new Error(error.message);
    }
};