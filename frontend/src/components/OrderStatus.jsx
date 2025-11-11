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
      {/* desktop / tablet layout */}
      <div className="hidden sm:block relative px-2 py-4">
        <div className="absolute left-10 right-10 top-8 h-1 bg-gray-700 rounded overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-start relative z-20 px-2">
          {STEPS.map((step, idx) => (
            <div key={step.key} className="flex-1 flex justify-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    idx < activeIndex
                      ? "bg-emerald-600 text-white"
                      : idx === activeIndex
                      ? "bg-emerald-50 ring-2 ring-emerald-400 text-emerald-700"
                      : "bg-gray-800 text-gray-400"
                  } shadow-sm`}
                >
                  {idx < activeIndex ? <CheckCircle size={16} /> : createElement(step.icon, { size: 16 })}
                </div>

                <div className="mt-3 text-center w-28">
                  <div
                    className={`text-xs ${
                      idx < activeIndex
                        ? "text-emerald-200"
                        : idx === activeIndex
                        ? "text-emerald-100 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* mobile layout: compact row with icons and small progress bar */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between gap-3 px-2">
          {STEPS.map((step, idx) => {
            const isDone = idx < activeIndex;
            const isActive = idx === activeIndex;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDone ? "bg-emerald-600 text-white" : isActive ? "bg-emerald-50 ring-2 ring-emerald-400 text-emerald-700" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {isDone ? <CheckCircle size={14} /> : createElement(step.icon, { size: 14 })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 px-4">
          <div className="w-full h-1 bg-gray-700 rounded overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between px-2 text-xs text-gray-300">
          <div>
            <span className="text-black font-medium">Status:</span> <span className="font-semibold text-gray-600 ml-2">{status || "N/A"}</span>
          </div>
          {/* <div className="text-xs text-gray-400">{s === "shipped" ? "Est. 2-4 days" : "—"}</div> */}
        </div>
      </div>

      {/* shared footer for desktop also */}
      <div className="mt-3 text-sm text-gray-300 hidden sm:flex items-center justify-between">
        <div>
          <span className="text-black font-medium">Status:</span> <span className="font-semibold text-gray-600 ml-2">{status || "N/A"}</span>
        </div>
        {/* <div className="text-xs text-gray-400">Estimated delivery: {s === "shipped" ? "2-4 days" : "—"}</div> */}
      </div>
    </div>
  );
}