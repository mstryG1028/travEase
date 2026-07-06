import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

import HamburgerMenu from "../navbar/HamburgerMenu";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpen(false);

    window.addEventListener("scroll", closeMenu);
    window.addEventListener("wheel", closeMenu);
    window.addEventListener("touchstart", closeMenu);
    window.addEventListener("keydown", closeMenu);
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("scroll", closeMenu);
      window.removeEventListener("wheel", closeMenu);
      window.removeEventListener("touchstart", closeMenu);
      window.removeEventListener("keydown", closeMenu);
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-theme shadow-theme transition-theme">
      <div className="max-w-7xl mx-auto h-18 px-6 flex items-center justify-between">
        {/* ================= Logo ================= */}

        <Link to="/" className="text-2xl font-bold text-brand">
          TravEase
        </Link>

        {/* ================= Search ================= */}

        <div className="hidden md:block">
          <div className="relative w-[420px]">
            <input
              type="text"
              placeholder="Search destinations..."
              className="input-theme rounded-full pr-12 text-sm"
            />

            <FiSearch
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
            />
          </div>
        </div>

        {/* ================= Right ================= */}

        <div className="flex items-center gap-5">
          {/* Guest */}

          {!user && (
            <>
              <Link
                to="/login"
                className="text-theme hover:text-brand transition-theme"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-theme hover:text-brand transition-theme"
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
                className="text-theme hover:text-brand transition-theme"
              >
                Become a Host
              </Link>

              <button
                onClick={handleLogout}
                className="text-theme hover:text-red-500 transition-theme"
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
                className="text-theme hover:text-brand transition-theme"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-theme hover:text-red-500 transition-theme"
              >
                Logout
              </button>
            </>
          )}

          {/* ================= Hamburger ================= */}

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="
                p-3
                rounded-full
                border
                border-theme
                bg-surface
                text-theme
                hover-surface
                transition-theme
              "
            >
              <FaBars />
            </button>

            {open && <HamburgerMenu user={user} close={() => setOpen(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
