import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export default function ClaimWarrantyForm() {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    productName: "",
    reason: "",
    photo: "",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.productName.trim() === "" || form.reason.trim() === "") {
      setError("Please fill out all required fields.");
      return;
    } else if (!photo) {
      setError("Please upload a photo of the product.");
      return;
    }

    try {
        const res = await axiosInstance.post("products/warranty/claim", form);
        if (res.data.success) {
            toast.success("Warranty claim submitted successfully!");
            setForm({ productName: "", reason: "" });
        }
        else {
            setError(res.data.message || "Failed to submit warranty claim. Please try again.");
        }
    } catch {
        setError("Failed to submit warranty claim. Please try again later.");
    }
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden py-12 px-4 md:px-16">
      {/* Diagonal Stylish Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-white to-emerald-300" />
        <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-200/60 via-emerald-100/30 to-transparent rotate-[-18deg] blur-2xl" />
        <div className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-400/30 via-emerald-100/10 to-transparent rotate-[12deg] blur-2xl" />
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-10">
        {/* Warranty Info Section (Left) */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-3">
            Warranty Claim Center
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-2">
            At Sharwings, we stand behind the quality of our products. If you
            experience any issues covered under warranty, you can easily submit
            a claim below.
          </p>
          <ul className="text-gray-600 text-base md:text-lg list-disc list-inside mx-auto md:mx-0 max-w-xl mb-2">
            <li>
              Warranty covers manufacturing defects and hardware failures.
            </li>
            <li>
              Please provide a clear photo of the product and describe the issue
              in detail.
            </li>
            <li>
              Our support team will review your claim and get back to you within
              3-5 business days.
            </li>
          </ul>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm shadow">
            Need help? Contact{" "}
            <a href="mailto:sharwings@outlook.com" className="underline">
              sharwings@outlook.com
            </a>
          </span>
        </div>
        {/* Form Section (Right) */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100">
          <h2 className="text-xl font-bold text-emerald-700 mb-6">
            Claim Warranty
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div
              className={`${
                error ? "flex" : "hidden"
              } justify-left items-center gap-2 px-4 border-2 border-red-600 bg-red-100 h-16 rounded-lg`}
            >
              <TriangleAlert color="#cc0000" />
              <p className="text-red-600 font-medium text-sm">{error}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500 text-black"
                value={form.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Photo
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="photo-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-100 transition text-emerald-700 font-semibold shadow"
                >
                  <ImageIcon size={20} className="text-emerald-500" />
                  {photo ? "Change Photo" : "Choose Photo"}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded shadow border border-emerald-100"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Reason for Claim
              </label>
              <textarea
                className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Describe the issue or reason for warranty claim"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-2 rounded hover:bg-emerald-700 transition"
            >
              Submit Claim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
