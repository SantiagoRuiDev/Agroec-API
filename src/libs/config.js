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
    prod_database_uri: process.env.DB_PROD_URI,
    prod_database_user: process.env.DB_PROD_USER,
    prod_database_host: process.env.DB_PROD_HOST,
    prod_database_password: process.env.DB_PROD_PASSWORD,
    prod_database_name: process.env.DB_PROD_NAME,
    prod_dabatase_port: process.env.DB_PROD_PORT,
    smtp_login: process.env.SMTP_LOGIN,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_pass: process.env.SMTP_PASS,
    auth_token_twilio: process.env.AUTH_TOKEN_TWILIO,
    sms_number_twilio: process.env.SMS_NUMBER_TWILIO,
    account_sid_twilio: process.env.ACCOUNT_SID_TWILIO,
    payment_token: process.env.PAGOMEDIOS_TOKEN,
    secure: process.env.SECURE,
    max_pending_orders: process.env.MAX_PENDING_ORDERS,
    max_unreceived_orders: process.env.MAX_UNRECEIVED_ORDERS,
    onesignal_api_key: process.env.ONESIGNAL_API_KEY,
    onesignal_app_id: process.env.ONESIGNAL_APP_ID,
    frontend_domain: process.env.FRONTEND_DOMAIN,
    production: (process.env.PRODUCTION == 'true') ? true : false
}