import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getCustomerOrderHistory, orderReturnAction, requestOrderReturn, getOrderReturnHistory } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/history", protectRoute, getCustomerOrderHistory);
router.post("/return", protectRoute, requestOrderReturn);
router.get("/return/action", protectRoute, adminRoute, orderReturnAction);
router.get("/returns", protectRoute, adminRoute, getOrderReturnHistory);

export default router;