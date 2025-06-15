import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export default function HomePageBanner() {

    const { user } = useUserStore();
    const navigate = useNavigate();
    
    const handleNavigation = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please log in to avail this offer.");
            navigate("/login");
            return;
        }
        navigate("/shop");
    }

  return (
    <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-8 px-4 flex flex-col items-center justify-center shadow-lg mb-6 rounded-lg">
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
        Up to <span className="text-yellow-300">80% Off</span> on Electric
        Items!
      </h2>
      <p className="text-lg mb-4 text-center">
        Limited time offer. Don&apos;t miss out!
      </p>
      <a
        href="/shop"
        onClick={handleNavigation}
        className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold px-6 py-2 rounded-md shadow transition duration-300"
      >
        Shop Now
      </a>
    </div>
  );
}
