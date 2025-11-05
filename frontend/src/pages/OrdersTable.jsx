import { motion } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import TableSkeleton from "../components/TableSkeleton";

const OrdersTable = () => {
  const [ordersReturn, setOrdersReturn] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const getReturnedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/orders/orders-all", {
          params: { page: page },
        });
        setOrdersReturn(response.data?.orders);
        if (page === 1) {
          setTotalPages(response.data?.totalPages);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "could not fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getReturnedProducts();
  }, [page]);

    const handleOrderStatusChange = async (e) => {
    try {
      setLoading(true);
      const orderId = e.target?.dataset?.orderid;
      const newStatus = e.target?.dataset?.id;
      const response = await axios.put(`/orders/status/${orderId}`, {
        status: e.target?.dataset?.id,
      });
      toast.success(response.data.msg);
      // Update state to reflect the change immediately
      const updatedOrders = ordersReturn.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrdersReturn(updatedOrders);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change the status of the product. Try again sometime.");
    } finally {
      setLoading(false);
      setOpenMenuId(null);
    }
  }

  return loading ? (
    <TableSkeleton />
  ) : (
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
              Payment Mode
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {ordersReturn?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order?.products?.map((product) => (
                    <div
                      key={product.product?._id}
                      className="mb-2 flex flex-col"
                    >
                      <p className="font-semibold">{product.product?.name}</p>
                      <p className="text-gray-400"> (x{product.quantity})</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.user?.name}</div>
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
                <div className="text-sm text-gray-300">
                  {order?.createdAt?.split("T")[0]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  <p>{order.returnRequest?.reason}</p>
                  <p>{order.returnRequest?.description}</p>
                  <p>
                    <span className="font-bold uppercase">raised At</span>{" "}
                    {order.returnRequest?.requestedAt?.split("T")[0]}
                  </p>
                </div>
              </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order?.paymentMode || 'N/A'}
                </div>
              </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order?.address ?
                          <>
                  {order.address.name}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zip}
                  <br />
                  {order.address.phone}
                </> : <p>N/A</p>
                  }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order?.status}
              </div>
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
                      className="absolute right-0 -top-[1px] mt-2 w-40 bg-gray-900 border-2 border-yellow-700 rounded shadow-lg z-50"
                      style={{ zIndex: 9999 }}
                    >
                      <ul className="relative">
                        {
                          loading && <Loader className="absolute top-50 left-20 h-5 w-5 animate-spin mx-auto my-2" />
                        }
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" data-orderid={order._id} data-id="pending" onClick={handleOrderStatusChange}>
                          pending
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" data-orderid={order._id} data-id="processed" onClick={handleOrderStatusChange}>
                          processed
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" data-orderid={order._id} data-id="shipped" onClick={handleOrderStatusChange}>
                          shipped
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" data-orderid={order._id} data-id="delivered" onClick={handleOrderStatusChange}>
                          delivered
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white" data-orderid={order._id} data-id="cancelled" onClick={handleOrderStatusChange}>
                          cancelled
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
      <div className="flex justify-center items-center gap-2 py-4 bg-gray-800">
        <button
          className="px-3 py-1 rounded bg-emerald-600 text-white disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-emerald-600 text-white disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};
export default OrdersTable;
