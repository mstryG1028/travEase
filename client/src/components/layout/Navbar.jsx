import { Link } from "react-router-dom";
import { FaMountain } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold text-[var(--primary)]"
        >
          <FaMountain />

          TravEase
        </Link>

        {/* Menu */}

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-[var(--primary)] duration-300"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="hover:text-[var(--primary)] duration-300"
          >
            Explore
          </Link>

          <Link
            to="/about"
            className="hover:text-[var(--primary)] duration-300"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-[var(--primary)] duration-300"
          >
            Contact
          </Link>

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] duration-300"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;