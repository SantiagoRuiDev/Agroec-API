import { Router } from "express";
import * as profileController from '../controllers/profile.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as profileMiddleware from '../middlewares/profile.middlware.js'

export const router = Router();


router.put('/', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)

//GETS
// Envio el ID del usuario a buscar, y busco entre todos los perfiles cual tiene.  
router.get('/me', authMiddleware.isAuthentified, profileController.getBuyerProfile)
router.get('/me/stats', authMiddleware.isAuthentified, profileController.getProfileStats)    
router.get('/me/reception-points', authMiddleware.isAuthentified, profileController.getProfilePoints);
router.get('/:id', authMiddleware.isAuthentified, profileController.getProfile)

//UPDATE bank accounts
//Comerciante
router.put('/merchant', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)
//Agricultor
router.put('/farmer', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)
//Asociacion Agricola
router.put('/assoc-agricultural', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)
//Comerciante Agroquimicos
router.put('/merchant-agrochemical', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)
