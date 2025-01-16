import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteFile = (fileUrl) => {
  const parsedUrl = new URL(fileUrl);

  // Obtener la ruta del archivo
  const originalPath = parsedUrl.pathname;

  // Obtener el nombre del archivo
  const fileName = path.basename(originalPath);

  // Ruta del archivo que quieres eliminar
  const filePath = path.join(__dirname, "public", "sheets", fileName);

  // Función para eliminar el archivo
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error al eliminar el archivo:", err);
    } else {
      console.log("Archivo eliminado con éxito:", filePath);
    }
  });
};
