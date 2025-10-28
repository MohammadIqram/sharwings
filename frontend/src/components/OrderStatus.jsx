import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { createElement } from "react";

const STEPS = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "processed", label: "Processed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];



export default function OrderStatus({ status = "" }) {
  const s = String(status || "").toLowerCase();
  if (s === "cancelled") {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
          <XCircle size={16} />
          <span className="font-semibold text-sm">Cancelled</span>
        </div>
        <div className="text-sm text-gray-400">If you think this is a mistake contact support.</div>
      </div>
    );
  }

  const activeIndex = Math.max(0, STEPS.findIndex((p) => p.key === s));
  const progressPercent = ((activeIndex) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative px-2 py-4">
        {/* horizontal connector line */}
        <div className="absolute left-10 right-10 top-8 h-1 bg-gray-700 rounded overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-start relative z-20 px-2">
          {STEPS.map((step, idx) => (
            <div key={step.key} className="flex-1 flex justify-start">
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    idx < activeIndex ? "bg-emerald-600 text-white" : idx === activeIndex ? "bg-emerald-50 ring-2 ring-emerald-400 text-emerald-700" : "bg-gray-800 text-gray-400"
                  } shadow-sm`}
                >
                  {idx < activeIndex ? <CheckCircle size={16} /> : createElement(step.icon, { size: 16 })}
                </div>

                <div className="mt-3 text-center w-28">
                  <div className={`text-xs ${idx < activeIndex ? "text-emerald-200" : idx === activeIndex ? "text-emerald-100 font-semibold" : "text-gray-400"}`}>
                    {step.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-300 flex items-center justify-between">
        <div>
          Status: <span className="font-semibold text-white ml-2">{s || "N/A"}</span>
        </div>
        <div className="text-xs text-gray-400">Estimated delivery: {s === "shipped" ? "2-4 days" : "—"}</div>
      </div>
    </div>
  );
}