import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Loader } from "lucide-react";
import { PlusCircle } from "lucide-react";

export default function AddAddressModal({
  showModal,
  setShowModal,
  form,
  handleChange,
  handleSave,
  loading,
}) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={handleSave}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-emerald-300 p-8"
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-emerald-600 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
              Add New Address
            </h2>
            <div className="space-y-4">
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                name="street"
                type="text"
                required
                placeholder="Street Address"
                value={form.street}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <div className="flex gap-3">
                <input
                  name="city"
                  type="text"
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  name="state"
                  type="text"
                  required
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div className="flex gap-3">
                <input
                  name="zip"
                  type="text"
                  required
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  name="phone"
                  type="text"
                  required
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 rounded-lg border border-emerald-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow transition"
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Address
                </>
              )}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
