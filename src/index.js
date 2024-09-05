// IMPORTAR DEPENDECIAS - AQUI
import express from "express";
import { APP_SETTINGS } from "./libs/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as tutorialRoutes } from "./routes/tutorials.routes.js";
import { router as suggestionRoutes } from "./routes/suggestion.routes.js";
import { router as productsRoutes } from "./routes/products.routes.js";
import { router as profilesRoutes } from "./routes/profiles.routes.js";
import { router as licitationRoutes } from "./routes/licitation.routes.js";
import { router as saleRoutes } from "./routes/sale.routes.js";
import { router as proposalRoutes } from "./routes/proposal.routes.js";
import { router as inputRoutes } from "./routes/input.routes.js";
import { router as qualificationRoutes } from "./routes/qualification.routes.js";
import { router as ordersRoutes } from "./routes/order.routes.js";
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
app.use('/api/v1/category', tutorialRoutes);
app.use('/api/v1/suggestion', suggestionRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/profile', profilesRoutes);
app.use('/api/v1/licitation', licitationRoutes);
app.use('/api/v1/sale', saleRoutes);
app.use('/api/v1/proposal', proposalRoutes);
app.use('/api/v1/input', inputRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/qualification', qualificationRoutes)



app.use('/public/images/products', express.static('public/images/products'));

app.listen(APP_SETTINGS.port, () =>
  console.log("API RUNNING ON PORT: " + APP_SETTINGS.port)
);
