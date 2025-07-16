import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);
	const { user } = useUserStore();

	const handlePayment2 = async () => {
		try {
			const res = await axios.post("/payments/create-checkout-session-razorpay", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});
	
			const { id, totalAmount } = res.data;
	
			// Razorpay options
			const options = {
				key: 'rzp_live_mHDXkBHoa1H26S', // Replace with your Razorpay key ID
				amount: totalAmount * 100, // Amount in paise
				currency: "INR",
				name: "Sharwings",
				description: "Purchase Description",
				order_id: id,
				handler: function (response) {
					window.location.href = `/purchase-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&token=${response.razorpay_signature}`;
				},
				prefill: {
					name: user?.name,
					email: user?.email,
				},
				theme: {
					color: "#3399cc",
				},
			};
	
			// Initialize Razorpay
			const razorpay = new window.Razorpay(options);
			razorpay.open();
	
			razorpay.on("payment.failed", function (response) {
				console.error("Payment failed:", response.error);
				alert("Payment failed. Please try again.");
			});
		} catch (error) {
			console.error("Error initiating Razorpay payment:", error);
			alert("Error initiating payment. Please try again.");
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>₹{formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-₹{formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>₹{formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment2}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
