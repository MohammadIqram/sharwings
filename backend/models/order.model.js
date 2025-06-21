import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		razorpayPaymentId: {
			type: String,
			unique: true,
		},
		razorpayOrderId: {
			type: String,
			unique: true,
		},
		returnRequest: {
			reason: { type: String, default: '' },
			description: { type: String, default: '' },
			status: {
			type: String,
			enum: ['None', 'Requested', 'Approved', 'Rejected', 'Completed'],
			default: 'None'
		},
		requestedAt: { type: Date },
		processedAt: { type: Date }
  	},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
