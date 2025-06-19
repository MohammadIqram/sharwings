import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCustomerOrderHistory } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/history", protectRoute, getCustomerOrderHistory);

export default router;