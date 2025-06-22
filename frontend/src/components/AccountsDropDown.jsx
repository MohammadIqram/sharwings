import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function AccountsDropDown () {
  const [open, setOpen] = useState(false);
  const { user, logout } = useUserStore();

  // Close dropdown when overlay is clicked
  const handleOverlayClick = () => setOpen(false);

  const signOut = () => {
    logout();
    setOpen(false); 
  }

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-emerald-700 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <User size={22} />
        <span className="font-semibold">Accounts</span>
      </button>
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleOverlayClick}
            aria-label="Close dropdown"
          />
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50 py-2">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <User size={28} className="text-emerald-600" />
              <span className="text-gray-800 font-medium text-sm">{user?.email}</span>
            </div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/orders"
              className="block px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}