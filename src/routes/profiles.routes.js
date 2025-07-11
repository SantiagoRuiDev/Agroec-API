import { Router } from "express";
import * as profileController from '../controllers/profile.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
import * as profileMiddleware from '../middlewares/profile.middlware.js'

export const router = Router();


router.get('/organizations', profileController.getOrganizations)
router.post('/organizations', profileController.createOrganization)
router.get('/me', authMiddleware.isAuthentified, profileController.getProfileByUser)
router.get('/me/stats', authMiddleware.isAuthentified, profileController.getProfileStats)    
router.post('/me/reception-points', authMiddleware.isAuthentified, authMiddleware.isMultiuserProfileAllowed, profileController.createReceptionPoint);
router.get('/me/reception-points', authMiddleware.isAuthentified, authMiddleware.isMultiuserProfileAllowed, profileController.getProfilePoints);
router.delete('/me/reception-points/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserProfileAllowed, profileController.deleteProfilePoint);
router.delete('/me/contact/:id', authMiddleware.isAuthentified, authMiddleware.isMultiuserProfileAllowed, profileController.deleteContact);
router.get('/:id', authMiddleware.isAuthentified, profileController.getProfile);
router.put('/', authMiddleware.isAuthentified, authMiddleware.isMultiuserProfileAllowed, profileMiddleware.updateProfile, profileController.updateProfile);
