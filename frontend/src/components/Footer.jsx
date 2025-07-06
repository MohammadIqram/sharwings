import { Link } from "react-router-dom";
import Logo from "../../public/logo.jpeg";

const Footer = () => (
    <footer className="w-full bg-gray-900 border-t border-emerald-800 py-4 mt-8">
        <div className="h-[400px] container mx-auto flex flex-col sm:flex-row justify-around items-center px-4">
            {/* Left: Logo */}
            <Link to="/" className="hidden lg:block text-2xl font-bold text-emerald-400 mb-4 sm:mb-0">
                <img src={Logo} alt="logo" className="w-56 h-32" />
            </Link>
            {/* Right: 3 Columns of Links */}
            <div className="flex flex-col sm:flex-row gap-8 text-gray-400 text-sm">
                {/* Column 1 */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className="font-semibold text-emerald-400 mb-1 text-lg">Company</span>
                    <Link to="/aboutus" className="hover:text-emerald-400 text-[1.08rem]">About Us</Link>
                    <Link to="/contact" className="hover:text-emerald-400 text-[1.08rem]">Contact</Link>
                    <Link to="/careers" className="hover:text-emerald-400 text-[1.08rem]">Careers</Link>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                    <span className="font-semibold text-emerald-400 mb-1 text-lg">Support</span>
                    <Link to="/privacy" className="hover:text-emerald-400 text-[1.08rem]">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-emerald-400 text-[1.08rem]">Terms of Service</Link>
                    <Link to="/return-policy" className="hover:text-emerald-400 text-[1.08rem]">Return Policy</Link>
                </div>
                {/* Column 3 */}
                <div className="hidden lg:flex flex-col gap-1 min-w-[120px]">
                    <span className="font-semibold text-emerald-400 mb-1 text-lg">Quick Links</span>
                    <Link to="/" className="hover:text-emerald-400 text-[1.08rem]">Home</Link>
                    <Link to="/cart" className="hover:text-emerald-400 text-[1.08rem]">Cart</Link>
                    <Link to="/category/electronics" className="hover:text-emerald-400 text-[1.08rem]">Electronics</Link>
                </div>
            </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} Sharwings. All rights reserved.
        </div>
    </footer>
);

export default Footer;