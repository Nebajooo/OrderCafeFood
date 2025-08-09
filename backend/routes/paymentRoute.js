import express from "express";
const router = express.Router();

import isVerifiedUser from "../middlewares/tokenVerification.js";
import {
  createOrder,
  verifyPayment,
  webHookVerification,
} from "../controllers/paymentController.js";

router.post("/create-order", isVerifiedUser, createOrder);
router.post("/verify-payment", isVerifiedUser, verifyPayment);
router.post("/webhook-verification", webHookVerification);

export default router;
