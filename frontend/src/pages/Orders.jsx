import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import ReturnModal from "../components/OrderReturnForm";
import OrderReturnProgressbar from "../components/OrderReturnProgressbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showReturn, setShowReturn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const setModal = (e) => {
    setSelectedOrder(e.target?.dataset?.orderid || null);
    setShowReturn((prev) => !prev);
  }

  useEffect(() => {
    // Replace with API call in real app
    const getOrderHistory = async () => {
        try {
            const res = await axios.get("/orders/history");
            if (res.data.success) {
                setOrders(res.data.orders);
                console.log(res.data.orders);
            } else {
                setOrders([]);
            }
        } catch {
            toast.error("Failed to fetch order history. Please try again later.");
        }
    }

    getOrderHistory();
  }, []);

  return (
    <div className="min-h-[60vh] bg-white py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500 text-lg">You have no orders yet.</div>
      ) : (
        <div className="space-y-8">
          {orders?.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-xl shadow p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <span className="font-semibold text-gray-700">Order ID: {order._id}</span>
                  <span className="ml-6 font-semibold text-gray-700">Date: {order.createdAt?.split("T")[0]}</span>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                    delivered
                  </span>
                </div>
              </div>
              <div className="divide-y">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex items-start py-4">
                    <img src={item.product?.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 max-w-lg">{item.product?.name}</div>
                      <div className="text-gray-500 text-sm mt-2">Qty: {item.quantity}</div>
                      <div className="font-bold text-emerald-600 mt-2 text-2xl">₹{item.price}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition" data-orderid={order._id} onClick={setModal}>Return</button>
                      <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-300 transition">Get Help</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                    {
                      order.returnRequest && (
                      <div>
                        <OrderReturnProgressbar request={order.returnRequest} />
                      </div>
                      )
                    }
                <span className="font-bold text-lg text-gray-800">Order Total: ₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ReturnModal open={showReturn} onClose={setModal} selectedOrder={selectedOrder} />
    </div>
  );
}