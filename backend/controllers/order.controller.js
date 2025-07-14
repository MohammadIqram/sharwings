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

export const orderReturnAction = async (req, res) => {
    const { pid, action } = req.body;

    if (!pid || !action) {
        return res.status(400).json({
            success: false,
            msg: "please provide a valid product id and action to be taken!"
        });
    }

    try {
        const result = await Product.updateOne(
            { _id: pid },
            { status: action }
        );
    
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                success: true,
                msg: "order status updated Successfully"
            });
        }
    
        return res.status(500).json({
            success: false,
            msg: 'some unexpected error occured!'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "some unexpected error occured!"
        });
    }
}

export const getOrderReturnHistory = async (req, res) => {

    try {
        const orders = await Order.find({ "returnRequest.return": true })
            .populate("user", "name email")
            .populate("products.product", "name image")
            .lean();
        console.log(orders);
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Error in getOrderReturnHistory controller", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const showAllOrders = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page);
    const skip = (page - 1) * limit;
    console.log(skip);
    console.log(page);
    let docs = 1;
    try {
        const orders = await Order.find({}).skip(skip).limit(limit)
        .populate("user", "name email")
        .populate("products.product", "name image")
        .lean();
        if (page === 1) {
            docs = await Order.estimatedDocumentCount();
        }
        const totalPages = Math.ceil(docs / limit);
        return res.status(200).json({
            orders: orders,
            totalPages: totalPages
        });
    } catch {
        return res.status(500).json({});
    }
}