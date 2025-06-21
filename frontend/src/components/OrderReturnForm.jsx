import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const returnReasons = [
  "Wrong item received",
  "Item damaged",
  "Item defective",
  "Missing parts",
  "Arrived late",
  "Better price available",
  "No longer needed",
  "Ordered by mistake",
  "Product not as described",
  "Quality not as expected",
  "Received extra item",
  "Size/fit issue",
  "Changed my mind",
  "Found alternative",
  "Other",
];

export default function ReturnModal({
  open,
  onClose,
  selectedOrder,
}) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    description: "",
    reason: "",
  });

  if (!open) return null;

  const handleForm = async (e) => {
    e.preventDefault();
    if (!form.reason) {
      setError("Please fill out all required fields.");
      return;
    } else if (form.reason === "Other" && !form.description) {
      setError('Please provide a description for "Other" reason.');
      return;
    }
    try {
        const res = await axiosInstance.post('/orders/return', {form, selectedOrder});
        if (res.data.success) {
            toast.success("Return request submitted successfully!");
            setError(null);
            setForm({ description: "", reason: "" });
            onClose();
        }
        else {
            setError(res.data.message || "Failed to submit return request. Please try again.");
        }
    } catch {
        setError("Failed to submit return request. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
          <h2 className="text-xl font-bold mb-4 text-emerald-700">
            Return Item
          </h2>
          <form onSubmit={handleForm}>
            <div
              className={`${
                error ? "flex" : "hidden"
              } justify-left items-center gap-2 px-4 border-2 border-red-600 bg-red-100 h-16 rounded-lg`}
            >
              <TriangleAlert color="#cc0000" />
              <p className="text-red-600 font-medium text-sm">{error}</p>
            </div>
            <label className="block mb-2 font-medium text-gray-700">
              Reason for return
              <select
                className="block w-full mt-1 p-2 rounded border-2 border-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                value={form.reason}
                name="reason"
                defaultValue={form.reason}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="" disabled key="default">
                  Select a reason
                </option>
                {returnReasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                ))}
              </select>
            </label>
            <label className="block my-8 font-medium text-gray-700">
              Description (optional)
              <textarea
                className="block w-full mt-1 p-2 rounded border-2 border-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                rows={3}
                name="description"
                value={form.description}
                onChange={(e) => handleChange(e)}
                placeholder="Describe your issue..."
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={(e) => {
                    setError(null);
                    onClose(e);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Submit Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
