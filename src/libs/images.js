// upload.ts
import multer from "multer";
import path from "path";
import {APP_SETTINGS} from "./config.js";

// Configuración de Multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/sales"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname); // Nombre único para el archivo
  },
});

const storageTemp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/temp"); // Carpeta temporal para archivos XLSX
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadTemp = multer({
  storage: storageTemp,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB límite
  fileFilter: (req, file, cb) => {
    const filetypes = /xlsx|xls/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype || extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Solo archivos Excel (xlsx, xls) son permitidos!"));
    }
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limitar el tamaño del archivo a 5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|svg|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Error: Solo imágenes (jpeg, jpg, png, gif, webp) son permitidas!"
        )
      );
    }
  },
});

// Middleware para agregar fileUrl al req
const addFileUrl = (req, res, next) => {
  if (req.file) {
    const protocol = APP_SETTINGS.production ? "https" : "http";
    req.image_url = `${protocol}://${req.get("host")}/public/images/sales/${
      req.file.filename
    }`;
  }
  next();
};

const addFileUrls = (req, res, next) => {
  if (req.files) {
    req.images_urls = req.files.map((file) => {
    const protocol = APP_SETTINGS.production ? "https" : "http";
      return `${protocol}://${req.get("host")}/public/images/sales/${
        file.filename
      }`;
    });
  }
  next();
};

export { upload, addFileUrl, addFileUrls, uploadTemp };
