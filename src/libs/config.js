import { config } from "dotenv";

config();

export const APP_SETTINGS = {
    secret_key: process.env.SECRET,
    port: process.env.PORT | 3000,
    domain: process.env.DOMAIN,
    database_user: process.env.DB_USER,
    database_host: process.env.DB_HOST,
    database_password: process.env.DB_PASSWORD,
    database_name: process.env.DB_NAME,
}