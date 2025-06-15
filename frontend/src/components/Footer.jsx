import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="w-full bg-gray-900 border-t border-emerald-800 py-4 mt-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
            {/* Left: Logo */}
            <Link to="/" className="text-2xl font-bold text-emerald-400 mb-2 sm:mb-0">
                Sharwings
            </Link>
            {/* Right: Content */}
            <div className="text-gray-400 text-sm flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                <span>&copy; {new Date().getFullYear()} Sharwings. All rights reserved.</span>
                <Link to="/privacy" className="hover:text-emerald-400">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-emerald-400">Terms of Service</Link>
            </div>
        </div>
    </footer>
);

export default Footer;