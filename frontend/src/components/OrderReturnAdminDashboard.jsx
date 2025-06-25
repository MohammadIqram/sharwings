import { motion } from "framer-motion";
import { Trash, EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const OrderReturnAdminDashboard = () => {
  const [ordersReturn, setOrdersReturn] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const getReturnedProducts = async () => {
      try {
        const response = await axios.get("/orders/returns");
        setOrdersReturn(response.data?.orders);
      } catch (error) {
        toast.error(error.response?.data?.error || "could not fetch orders");
      }
    };

    getReturnedProducts();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-x-scroll max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Ordered Products
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Total Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Placed At
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Return
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {ordersReturn?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order.products.map((product) => (
                    <div key={product.product._id} className="mb-2 flex flex-col">
                      <p className="font-semibold">{product.product.name}</p>
                      <p className="text-gray-400"> (x{product.quantity})</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order.user?.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.user?.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  ₹{order.totalAmount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.createdAt.split('T')[0]}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                    <p>{order.returnRequest?.reason}</p>
                    <p>{order.returnRequest?.description}</p>
                    <p><span className="font-bold uppercase">raised At</span> {order.returnRequest?.requestedAt?.split('T')[0]}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.returnRequest?.status}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div
                  onMouseEnter={() => setOpenMenuId(order._id)}
                  onMouseLeave={() => setOpenMenuId(null)}
                  className="inline-block relative"
                >
                  <button
                    data-pid={order._id}
                    className="text-red-400 hover:text-red-300 relative"
                    style={{ position: "relative" }}
                  >
                    <EllipsisVertical className="h-5 w-5" color="#ffffff" />
                  </button>
                  {openMenuId === order._id && (
                    <div
                      className="absolute right-0 -top-[1px] mt-2 w-40 bg-gray-900 border border-gray-700 rounded shadow-lg z-50"
                      style={{ zIndex: 9999 }}
                    >
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white">
                          approve
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
export default OrderReturnAdminDashboard;
