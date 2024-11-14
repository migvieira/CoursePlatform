import express from 'express';
import { auth } from '../middleware/auth.js';
import { createPayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', auth, createPayment);
router.post('/verify', auth, verifyPayment);

export default router;