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

export const requestOrderReturn = async (req, res) => {
    const { form, selectedOrder } = req.body;
    try {
        const order = await Order.findById(selectedOrder);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to return this order" });
        }

        order.returnRequest.reason = form.reason;
        order.returnRequest.description = form.description || '';
        order.returnRequest.requestedAt = new Date();
        order.returnRequest.status = 'Requested';
        
        await order.save();

        res.json({ success: true, message: "Return request submitted successfully" });
    } catch (error) {
        console.error("Error in requestOrderReturn controller", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}