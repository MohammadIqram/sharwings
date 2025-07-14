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
