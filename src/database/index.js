import mysql from 'mysql2/promise';
import {APP_SETTINGS} from '../libs/config.js';
import fs from 'fs/promises';  

// Funcion asincrona para conectarse a la db
export async function connect() {
    try {
        const pool = mysql.createPool({
            host: (!APP_SETTINGS.production) ? APP_SETTINGS.database_host : APP_SETTINGS.prod_database_host,
            user: (!APP_SETTINGS.production) ? APP_SETTINGS.database_user : APP_SETTINGS.prod_database_user,
            password: (!APP_SETTINGS.production) ? APP_SETTINGS.database_password : APP_SETTINGS.prod_database_password,
            database: (!APP_SETTINGS.production) ? APP_SETTINGS.database_name : APP_SETTINGS.prod_database_name,
            port: (!APP_SETTINGS.production) ? 3306 : APP_SETTINGS.prod_dabatase_port,
            ssl: false,
            connectionLimit: 5, // Ajusta según tus necesidades
            waitForConnections: true,
            queueLimit: 0
        });
        return pool;
    } catch(error){
        throw error; // Si falla muestra el error en consola.
    }
}


// Función para verificar si la base de datos 'agroec' existe y crearla si no
export async function checkAndCreateAgroecDatabase() {
    try {
        // Conectar al servidor MySQL sin especificar base de datos
        const connection = await mysql.createConnection({
            host: (!APP_SETTINGS.production) ? APP_SETTINGS.database_host : APP_SETTINGS.prod_database_host,
            user: (!APP_SETTINGS.production) ? APP_SETTINGS.database_user : APP_SETTINGS.prod_database_user,
            password: (!APP_SETTINGS.production) ? APP_SETTINGS.database_password : APP_SETTINGS.prod_database_password,
            port: (!APP_SETTINGS.production) ? 3306 : APP_SETTINGS.prod_dabatase_port,
            ssl: false,
            connectTimeout: 60000
        });

        // Verificar si la base de datos 'agroec' existe
        const [rows] = await connection.query(`SHOW DATABASES LIKE 'agroec';`);

        if (rows.length === 0) {
            console.log('La base de datos "agroec" no existe. Creando...');

            // Leer el archivo SQL desde tu servidor
            const sqlFilePath = './src/sql/default.sql';  // Asegúrate de proporcionar la ruta correcta
            const sqlScript = await fs.readFile(sqlFilePath, 'utf8');

            // Ejecutar el contenido del archivo SQL para crear la base de datos
            await connection.query(sqlScript);
            console.log('Base de datos "agroec" creada exitosamente con el archivo SQL.');
        } else {
            console.log('La base de datos "agroec" ya existe.');
        }

        // Cerrar la conexión
        await connection.end();
    } catch (error) {
        console.error('Error al verificar o crear la base de datos:', error);
        throw error;
    }
}