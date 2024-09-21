import { Router } from "express";
import * as authMiddleware from '../middlewares/auth.middleware.js'
// Importar Controlador de Advertising
import * as advertisingController from '../controllers/advertising.controller.js'
import {upload, addFileUrl} from '../libs/images.js'

export const router = Router();

// La tabla en la DB se llama "publicidades", tiene id, nombre, url e imagen. 
// (Las primeras tres deben enviarse al crear una publicidad).
// El ultimo campo se completa mediante un put a esa publicidad.

// Ruta [POST]: / (Enviar nombre y url); (La imagen estara nula al crear publicidad.)
router.post('/', authMiddleware.isAuthentified, advertisingController.createAdvertising);

// Ruta [GET]: / Listar todos los anuncios;
router.get('/', authMiddleware.isAuthentified, advertisingController.getAllAdvertising);

//Esta ruta debe actualizar el campo "imagen" de una publicidad.
// El addFileUrl te guarda la imagen subida en req.image_url, ese atributo lo usas en el controlador
//  para pasarselo al modelo y actualizar la imagen.
// Para probar enviar solicitud de tipo form-data con campo de file llamado image y una imagen de prueba.

router.put('/set-image/:id', authMiddleware.isAuthentified, upload.single('image'), addFileUrl, advertisingController.updateImageById);

//Agregarla a Index al final.