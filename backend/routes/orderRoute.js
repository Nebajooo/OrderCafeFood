import express from "express";
import {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController.js";
import isVerifiedUser from "../middlewares/tokenVerification.js";

const router = express.Router();

router.post("/", isVerifiedUser, addOrder);
router.get("/", isVerifiedUser, getOrders);
router.get("/:id", isVerifiedUser, getOrderById);
router.put("/:id", isVerifiedUser, updateOrder);

export default router;
