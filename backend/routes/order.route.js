import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getCustomerOrderHistory, orderReturnAction, requestOrderReturn, getOrderReturnHistory, showAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/history", protectRoute, getCustomerOrderHistory);
router.post("/return", protectRoute, requestOrderReturn);
router.get("/return/action", protectRoute, adminRoute, orderReturnAction);
router.get("/returns", protectRoute, adminRoute, getOrderReturnHistory);
router.get("/orders-all", protectRoute, adminRoute, showAllOrders);

export default router;