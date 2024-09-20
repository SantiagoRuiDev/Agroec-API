import { Router } from "express";
import * as productController from '../controllers/products.controller.js'

export const router = Router();

router.get('/', productController.getAllProducts)

// ENDPOINT CREAR PRODUCTO
// ENDPOINT ELIMINAR PRODUCTO