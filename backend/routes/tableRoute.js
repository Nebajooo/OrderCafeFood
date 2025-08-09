import express from "express";
import {
  addTable,
  getTables,
  updateTable,
} from "../controllers/tableController.js";
import isVerifiedUser from "../middlewares/tokenVerification.js";

const router = express.Router();

router.post("/", isVerifiedUser, addTable);
router.get("/", isVerifiedUser, getTables);
router.put("/:id", isVerifiedUser, updateTable);

export default router;
