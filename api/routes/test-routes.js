import express from 'express';
import {
	shouldBeAdmin,
	shouldBeLogin,
} from '../controllers/test-controller.js';
import { verifyToken } from '../middleware/verify-token.js';

const router = express.Router();

router.get('/should-be-logged-in', verifyToken, shouldBeLogin);

router.get('/should-be-admin', shouldBeAdmin);

export default router;
