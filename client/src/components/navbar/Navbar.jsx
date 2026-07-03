import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import HamburgerMenu from "../navbar/HamburgerMenu";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[var(--primary)]">
          TravEase
        </Link>

        {/* Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search destinations..."
            className="border rounded-full px-5 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Guest */}
          {!user && (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-[var(--primary)] transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="font-medium hover:text-[var(--primary)] transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* User */}
          {user?.role === "user" && (
            <>
              <Link
                to="/become-host"
                className="font-medium hover:text-[var(--primary)] transition"
              >
                Become a Host
              </Link>

              <button
                onClick={handleLogout}
                className="font-medium hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Owner */}
          {user?.role === "owner" && (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-[var(--primary)] transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="font-medium hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="border rounded-full p-3 hover:bg-gray-100 transition"
          >
            <FaBars />
          </button>

          {open && <HamburgerMenu user={user} close={() => setOpen(false)} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
