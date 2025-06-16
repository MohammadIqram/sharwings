import { motion } from "framer-motion";

export default function ReturnPolicy() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white py-12 px-4 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 16 }}
        className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">Return & Refund Policy</h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-700 mb-4"
        >
          At Sharwings, we want you to be completely satisfied with your purchase. If you are not satisfied, we’re here to help!
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-xl font-semibold text-emerald-600 mb-2"
        >
          Returns
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="list-disc pl-6 text-gray-700 mb-4"
        >
          <li>You may request a return within <span className="font-semibold">7 days</span> of receiving your item.</li>
          <li>To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.</li>
          <li>To initiate a return, please contact us at <a href="mailto:sharwings@outlook.com" className="text-emerald-600 underline">sharwings@outlook.com</a> with your order details.</li>
        </motion.ul>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-xl font-semibold text-emerald-600 mb-2"
        >
          Refunds
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="list-disc pl-6 text-gray-700 mb-4"
        >
          <li>Once we receive your item, we will inspect it and notify you of the status of your refund.</li>
          <li>If your return is approved, we will initiate a refund to your original method of payment within 5-7 business days.</li>
          <li>Shipping costs are non-refundable unless the return is due to our error (e.g., wrong or defective item).</li>
        </motion.ul>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-xl font-semibold text-emerald-600 mb-2"
        >
          Exchanges
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="list-disc pl-6 text-gray-700 mb-4"
        >
          <li>We only replace items if they are defective or damaged. If you need to exchange an item, contact us at <a href="mailto:sharwings@outlook.com" className="text-emerald-600 underline">sharwings@outlook.com</a>.</li>
        </motion.ul>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-xl font-semibold text-emerald-600 mb-2"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-gray-700"
        >
          If you have any questions about our return policy, please email us at <a href="mailto:sharwings@outlook.com" className="text-emerald-600 underline">sharwings@outlook.com</a> or call us at <a href="tel:+91780953951" className="text-emerald-600 underline">+91 780953951</a>.
        </motion.p>
      </motion.div>
    </div>
  );
}