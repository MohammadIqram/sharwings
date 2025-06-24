import { motion } from "framer-motion";
import { Trash, Star, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

export default function WarrantyClaimsAdminDashboard() {

    const [claims, setClaims] = useState([]);

  useEffect(() => {
    const getWarrantyTicktes = async () => {
      try {
        const response = await axios.get("/products/warranty/claim/dashboard");
        console.log(response);
        setClaims(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || "failed to update product");
      }
    };

    getWarrantyTicktes();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-visible max-w-7xl mx-auto"
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
              Product
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
              Raised At
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {claims?.map((claim) => (
            <tr key={claim._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={claim.imageUrl}
                      alt={claim.productName}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white max-w-xl text-wrap">
                      {claim.productName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {claim.user?.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {claim.user?.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {claim.createdAt?.split('T')[0]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
