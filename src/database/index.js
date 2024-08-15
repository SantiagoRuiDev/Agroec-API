import mysql from 'mysql2/promise';
import {APP_SETTINGS} from '../libs/config.js';


// Funcion asincrona para conectarse a la db
export async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: APP_SETTINGS.database_host,
            user: APP_SETTINGS.database_user,
            password: APP_SETTINGS.database_password,
            database: APP_SETTINGS.database_name,
            ssl: false,
            connectTimeout: 60000
        });        
        return connection;
    } catch(error){
        throw error; // Si falla muestra el error en consola.
    }
}
