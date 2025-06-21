import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCustomerOrderHistory, requestOrderReturn } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/history", protectRoute, getCustomerOrderHistory);
router.post("/return", protectRoute, requestOrderReturn);

export default router;