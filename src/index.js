// IMPORTAR DEPENDECIAS - AQUI
import express from "express";
import { APP_SETTINGS } from "./libs/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as tutorialRoutes } from "./routes/tutorials.routes.js";
import { router as categoriesRoutes } from "./routes/categories.routes.js";
import { router as suggestionRoutes } from "./routes/suggestion.routes.js";
import { router as paymentsRoutes } from "./routes/payments.routes.js";
import { router as productsRoutes } from "./routes/products.routes.js";
import { router as profilesRoutes } from "./routes/profiles.routes.js";
import { router as licitationRoutes } from "./routes/licitation.routes.js";
import { router as saleRoutes } from "./routes/sale.routes.js";
import { router as proposalRoutes } from "./routes/proposal.routes.js";
import { router as inputRoutes } from "./routes/input.routes.js";
import { router as qualificationRoutes } from "./routes/qualification.routes.js";
import { router as ordersRoutes } from "./routes/order.routes.js";
import { router as chatRoutes } from "./routes/chat.routes.js";
import { router as transactionsRoutes } from "./routes/transactions.routes.js";
import { router as walletRoutes } from "./routes/wallet.routes.js";
import { router as warrantyRoutes } from "./routes/warranty.routes.js";
import { router as advertisingRoutes } from "./routes/advertising.routes.js";
import { router as notificationRoutes } from "./routes/notification.routes.js";
import { router as multiusersRoutes } from "./routes/multiusers.routes.js";
import { router as suscriptionRoutes } from "./routes/suscription.routes.js";
import { router as preferencesRoutes } from "./routes/preferences.routes.js";
import { router as settingsRoutes } from "./routes/settings.routes.js";
import { router as userRoutes } from "./routes/user.routes.js";
import { connect } from "./database/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import "./socket/socket.js";
import "./libs/suscription.js";
import "./libs/robot.js";
import { initializeSocket } from "./socket/socket.js";
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 250, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// ---
// Abro la conexión aca para evitar realizar muchas conexiones en modelo.
export const connection = await connect();

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*", // Permite cualquier origen
  },
});

app.use(limiter);

app.use(
  "*",
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-multiuser-token"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeSocket(io); // Inicia el socket, y lo envia a otra función para que controle los eventos.
// RUTAS

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tutorials", tutorialRoutes);
app.use("/api/v1/category", categoriesRoutes);
app.use("/api/v1/suggestion", suggestionRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/profile", profilesRoutes);
app.use("/api/v1/licitation", licitationRoutes);
app.use("/api/v1/sale", saleRoutes);
app.use("/api/v1/proposal", proposalRoutes);
app.use("/api/v1/input", inputRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/qualification", qualificationRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/warranty", warrantyRoutes);
app.use("/api/v1/advertising", advertisingRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/multiusers", multiusersRoutes);
app.use("/api/v1/suscription", suscriptionRoutes);
app.use("/api/v1/preferences", preferencesRoutes);
app.use("/api/v1/payments", paymentsRoutes);
app.use("/api/v1/transactions", transactionsRoutes);
app.use("/api/v1/settings", settingsRoutes);

// Rutas de archivos estaticos en el servidor
app.use("/public/images/products", express.static("public/images/products"));
app.use("/public/images/icons", express.static("public/images/icons"));
app.use("/public/images/sales", express.static("public/images/sales"));
app.use("/public/sheets", express.static("public/sheets"));

server.listen(APP_SETTINGS.port, async () => {
  console.log("API RUNNING ON PORT: " + APP_SETTINGS.port);
});
