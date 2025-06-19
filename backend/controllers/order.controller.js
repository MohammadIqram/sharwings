import Order from "../models/order.model.js";

export const getCustomerOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        .populate("products.product", "name image")
        .lean();
        const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user",
            });
        }
        res.json({
            success:true,
            orders: sortedOrders
        });
    } catch (error) {
        console.error("Error in getCustomerOrderHistory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}