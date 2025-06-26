import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,

	getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error?.response?.data?.message || "An error occurred");
		}
	},
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
	addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
	removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
	updateQuantity: async (productId, quantity, action) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}
		try {
			if (action === "-") {
				// Just update cart locally and backend, no need to check stock
				await axios.put(`/cart/${productId}`, { quantity });
				set((prevState) => ({
					cart: prevState.cart.map((item) =>
						item._id === productId ? { ...item, quantity } : item
					),
				}));
				get().calculateTotals();
			} else if (action === "+") {
				// Check stock before incrementing
				const updateQtyReq = await axios.post("products/quantity", { id: productId, quantity });
				if (updateQtyReq.data.success) {
					await axios.put(`/cart/${productId}`, { quantity });
					set((prevState) => ({
						cart: prevState.cart.map((item) =>
							item._id === productId ? { ...item, quantity } : item
						),
					}));
					get().calculateTotals();
				}
			}
		} catch (error) {
			toast.error("this is the last piece of this product, you cannot update the quantity to more than 1");
			return;
		}
	},
	calculateTotals: () => {
		const { cart } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const discount = cart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
		let total = discount;

		set({ subtotal, total });
	},
}));
