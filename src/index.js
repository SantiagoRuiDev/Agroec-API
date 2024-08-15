// IMPORTAR DEPENDECIAS - AQUI
import express from "express";
import { APP_SETTINGS } from "./libs/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes.js";
import { connect } from './database/index.js';
// ---

// Abro la conexión aca para evitar realizar muchas conexiones en modelo.
export const connection = await connect();

const app = express();

app.use(
  "*",
  cors({
    origin: APP_SETTINGS.domain, // Cambiar por el Dominio.
    credentials: true, // Permite el envío de cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS

app.use('/api/v1/auth', authRoutes);

app.listen(APP_SETTINGS.port, () =>
  console.log("API RUNNING ON PORT: " + APP_SETTINGS.port)
);
