import { Router } from "express";
import * as profileController from '../controllers/profile.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as profileMiddleware from '../middlewares/profile.middlware.js'

export const router = Router();


router.put('/', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile)

//GETS
//Comprador            
router.get('/buyer/:profile_id', authMiddleware.isAuthentified, profileController.getBuyerProfile)
//Comerciante
router.get('/merchant/:profile_id', authMiddleware.isAuthentified, profileController.getMerchantProfile)
//Agricultor
router.get('/farmer/:profile_id', authMiddleware.isAuthentified, profileController.getFarmerProfile)
//Asociacion Agricola
router.get('/assoc-agricultural/:profile_id', authMiddleware.isAuthentified, profileController.getAssociationAgriculturalProfile)
//Comerciante Agroquimicos
router.get('/merchant-agrochemical/:profile_id', authMiddleware.isAuthentified, profileController.getMerchantAgrochemicalProfile)

