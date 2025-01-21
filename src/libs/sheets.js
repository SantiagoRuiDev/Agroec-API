import multer from "multer";
import path from "path";
import { APP_SETTINGS } from "./config.js";

// Configuración de Multer para almacenar los archivos de Excel
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/sheets"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname); // Nombre único para el archivo
  },
});

// Configuración de Multer con límites y filtros
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Limitar el tamaño del archivo a 10MB
  },
  fileFilter: (req, file, cb) => {
    // Aceptar archivos de tipo Excel .xlsx en formato binario
    const filetypes = /xlsx|xls/;
    const mimetype =
      filetypes.test(file.mimetype) ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Solo archivos Excel (XLSX, XLS) son permitidos!"));
    }
  },
});

// Middleware para agregar la URL del archivo al req
const addFileUrl = (req, res, next) => {
  if (req.file) {
    if (APP_SETTINGS.production) {
      req.file_url = `https://${req.get("host")}/public/sheets/${
        req.file.filename
      }`;
    } else {
      req.file_url = `http://${req.get("host")}/public/sheets/${
        req.file.filename
      }`;
    }
  }
  next();
};

// Middleware para manejar múltiples archivos y agregar sus URLs al req
const addFileUrls = (req, res, next) => {
  if (req.files) {
    req.files_urls = req.files.map((file) => {
      if (APP_SETTINGS.production) {
        return `https://${req.get("host")}/public/sheets/${file.filename}`;
      } else {
        return `http://${req.get("host")}/public/sheets/${file.filename}`;
      }
    });
  }
  next();
};

export { upload, addFileUrl, addFileUrls };
