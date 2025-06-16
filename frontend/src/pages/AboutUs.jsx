import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-[60vh] flex flex-col md:flex-row items-center justify-center bg-white py-12 px-4 md:px-16">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
          alt="About Sharwings"
          className="rounded-lg shadow-lg max-w-xs md:max-w-md"
        />
      </div>
      {/* Right: Content */}
      <div className="w-full md:w-1/2 md:pl-12">
        <h2 className="text-3xl font-bold text-emerald-700 mb-4">About Sharwings</h2>
        <p className="text-gray-700 text-lg mb-4">
          <span className="font-semibold text-emerald-600">Sharwings</span> is your trusted destination for high-quality electric items at unbeatable prices. 
          Our mission is to make technology accessible and affordable for everyone, offering up to <span className="text-emerald-600 font-semibold">80% off</span> on a wide range of products.
        </p>
        <p className="text-gray-600 mb-4">
          Founded by a team of passionate technophiles, Sharwings was born out of the desire to bridge the gap between innovation and affordability. We carefully curate our product selection to ensure every item meets our strict standards for quality, reliability, and value.
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Why choose Sharwings?</span>
          <ul className="list-disc pl-6 mt-2">
            <li>Exclusive discounts and seasonal offers on top brands</li>
            <li>Fast and reliable delivery across India</li>
            <li>Dedicated customer support to assist you at every step</li>
            <li>Secure payment options and hassle-free returns</li>
            <li>Regularly updated catalog with the latest gadgets and essentials</li>
          </ul>
        </p>
        <p className="text-gray-600 mb-4">
          We believe in building lasting relationships with our customers. Your satisfaction is our top priority, and we strive to provide a seamless shopping experience from browsing to checkout and beyond.
        </p>
        <p className="text-gray-600">
          Thank you for choosing Sharwings. We look forward to powering your world and being a part of your tech journey!
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Address Box */}
          <motion.div
            whileHover={{
              scale: 1.07,
              boxShadow: "0 8px 32px 0 rgba(16,185,129,0.25)",
              y: -6,
              rotate: -2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex flex-col items-center bg-gray-100 rounded-xl shadow-md p-4"
          >
            <MapPin className="text-emerald-600 mb-2" size={32} />
            <span className="font-semibold text-gray-800 mb-1">Address</span>
            <span className="text-center text-gray-700 text-sm">
              Osram, Ls Cables, Luker Fans<br />
              Lalbazar, Srinagar, Jammu & Kashmir<br />
              Pincode: 190023
            </span>
          </motion.div>
          {/* Phone Box */}
          <motion.div
            whileHover={{
              scale: 1.07,
              boxShadow: "0 8px 32px 0 rgba(16,185,129,0.25)",
              y: -6,
              rotate: 2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex flex-col items-center bg-gray-100 rounded-xl shadow-md p-4"
          >
            <Phone className="text-emerald-600 mb-2" size={32} />
            <span className="font-semibold text-gray-800 mb-1">Phone</span>
            <a href="tel:+91780953951" className="text-emerald-700 underline text-sm mb-1">
              +91 780953951
            </a>
            <a href="tel:+919682124722" className="text-emerald-700 underline text-sm">
              +91 9682124722
            </a>
          </motion.div>
          {/* Email Box */}
          <motion.div
            whileHover={{
              scale: 1.07,
              boxShadow: "0 8px 32px 0 rgba(16,185,129,0.25)",
              y: -6,
              rotate: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex flex-col items-center bg-gray-100 rounded-xl shadow-md p-4"
          >
            <Mail className="text-emerald-600 mb-2" size={32} />
            <span className="font-semibold text-gray-800 mb-1">Email</span>
            <a href="mailto:sharwings@outlook.com" className="text-emerald-700 underline text-sm">
              sharwings@outlook.com
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}