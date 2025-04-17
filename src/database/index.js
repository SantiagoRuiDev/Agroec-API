import mysql from 'mysql2/promise';
import { APP_SETTINGS } from '../libs/config.js';
import fs from 'fs/promises';

// Crear el pool una sola vez
const pool = mysql.createPool({
  host: (!APP_SETTINGS.production) ? APP_SETTINGS.database_host : APP_SETTINGS.prod_database_host,
  user: (!APP_SETTINGS.production) ? APP_SETTINGS.database_user : APP_SETTINGS.prod_database_user,
  password: (!APP_SETTINGS.production) ? APP_SETTINGS.database_password : APP_SETTINGS.prod_database_password,
  database: (!APP_SETTINGS.production) ? APP_SETTINGS.database_name : APP_SETTINGS.prod_database_name,
  port: (!APP_SETTINGS.production) ? 3306 : APP_SETTINGS.prod_dabatase_port,
  ssl: false,
  connectionLimit: 15,
  waitForConnections: true,
  queueLimit: 0
});

export default pool;
