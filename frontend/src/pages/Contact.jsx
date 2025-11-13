import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const contact = {
    address: "Osram, Ls Cables, Luker Fans Lalbazar, Srinagar, Jammu & Kashmir Pincode: 190023",
    phone: "+91 780953951, +91 9682124722",
    email: "sharwings@outlook.com",
  };

  const cardAnim = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-emerald-300 mb-2">Contact Us</h1>
          <p className="text-gray-400 mb-8">
            We're here to help. Reach out to us using any of the options below and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div {...cardAnim} className="bg-white/5 border border-emerald-800 rounded-lg p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700/10 text-emerald-300 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400">Address</div>
              <div className="mt-1 text-gray-100 font-medium text-sm">{contact.address}</div>
            </div>
          </motion.div>

          <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.08 }} className="bg-white/5 border border-emerald-800 rounded-lg p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700/10 text-emerald-300 flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400">Mobile No</div>
              <a href={`tel:${contact.phone}`} className="mt-1 text-gray-100 font-medium text-sm block">{contact.phone}</a>
            </div>
          </motion.div>

          <motion.div {...cardAnim} transition={{ ...cardAnim.transition, delay: 0.16 }} className="bg-white/5 border border-emerald-800 rounded-lg p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-700/10 text-emerald-300 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-sm text-gray-400">Email ID</div>
              <a href={`mailto:${contact.email}`} className="mt-1 text-gray-100 font-medium text-sm block">{contact.email}</a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-10 bg-white/3 border border-emerald-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-200 mb-2">Business hours</h3>
          <p className="text-sm text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM IST<br />Sat: 10:00 AM - 2:00 PM IST<br />Sun: Closed</p>
        </motion.div>
      </div>
    </div>
  );
}