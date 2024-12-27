import { Router } from "express";
import * as profileController from '../controllers/profile.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as profileMiddleware from '../middlewares/profile.middlware.js'

export const router = Router();


router.get('/organizations', profileController.getOrganizations)
router.post('/organizations', profileController.createOrganization)
router.get('/me', authMiddleware.isAuthentified, profileController.getProfileByUser)
router.get('/me/stats', authMiddleware.isAuthentified, profileController.getProfileStats)    
router.get('/me/reception-points', authMiddleware.isAuthentified, profileController.getProfilePoints);
router.delete('/me/reception-points/:id', authMiddleware.isAuthentified, profileController.deleteProfilePoint);
router.delete('/me/contact/:id', authMiddleware.isAuthentified, profileController.deleteContact);
router.get('/:id', authMiddleware.isAuthentified, profileController.getProfile);
router.get('/me/:type', authMiddleware.isAuthentified, profileController.getProfileByUser)
router.put('/', authMiddleware.isAuthentified, profileMiddleware.updateProfile, profileController.updateProfile);
