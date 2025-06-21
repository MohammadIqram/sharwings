
// Add this ProgressBar component to your OrdersPage file or as a separate component

export default function OrderReturnProgressBar({ request }) {

  return (
    <div className="flex items-center gap-2 my-4">
        <div className="flex items-center">
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full border-2
              ${
                request.status === 'Requested'
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400"
              }
            `}
          >
            1
          </div>
          <span
            className={`ml-2 mr-4 text-sm font-semibold ${
              request.status === 'Requested' ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            Initiated
          </span>
            <div
              className={`w-8 h-1 rounded ${
                request.status === 'Requested' ? "bg-emerald-400" : "bg-gray-300"
              }`}
            />
        </div>
                <div className="flex items-center">
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full border-2
              ${
                request.status === 'Approved'
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400"
              }
            `}
          >
            2
          </div>
          <span
            className={`ml-2 mr-4 text-sm font-semibold ${
              request.status === 'Approved' ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            Approved
          </span>
            <div
              className={`w-8 h-1 rounded ${
                request.status === 'Approved' ? "bg-emerald-400" : "bg-gray-300"
              }`}
            />
        </div>
                <div className="flex items-center">
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full border-2
              ${
                request.status === 'Completed'
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400"
              }
            `}
          >
            3
          </div>
          <span
            className={`ml-2 mr-4 text-sm font-semibold ${
              request.status === 'Completed' ? "text-emerald-700" : "text-gray-400"
            }`}
          >
            Completed
          </span>
        </div>
    </div>
  );
}