import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail } from "lucide-react";

export default function Career () {
  const brands = [
    "Honeywell",
    "ABB",
    "APAR",
    "Havells",
    "Legrand",
    "Osram Ledvance",
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-300">Careers at Sharwings</h1>
            <p className="text-gray-400 mt-1">
              Join our team — be part of a fast-growing company working with top electrical & lighting brands.
            </p>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="bg-white/5 border border-emerald-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-200 mb-3">We deal in brands like</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {brands.map((b) => (
              <motion.div
                key={b}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="w-12 h-12 rounded-md bg-emerald-700/10 flex items-center justify-center text-emerald-200 font-semibold">
                  {b.split(" ").map(s => s[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="text-sm text-gray-300 font-medium">{b}</div>
                  <div className="text-xs text-gray-500">Authorized partner</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-gray-300 font-semibold">Interested in working with us?</div>
              <div className="text-gray-500 text-sm mt-1">Send your CV or queries to our careers team.</div>
            </div>

            <a
              href="mailto:sharwings@outlook.com?subject=Career%20Enquiry"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition"
            >
              <Mail className="w-4 h-4" /> Apply / Contact
            </a>
          </div>
        </motion.section>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.45 }} className="mt-6 text-sm text-gray-500">
          <p>
            Sharwings values talent, integrity and customer focus. We offer a collaborative environment, competitive pay and opportunities to grow with leading brands in the electrical & lighting industry.
          </p>
        </motion.div>
      </div>
    </div>
  );
}