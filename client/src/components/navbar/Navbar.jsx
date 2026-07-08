import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

import HamburgerMenu from "../navbar/HamburgerMenu";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
  }, [searchParams]);

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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    } else {
      params.delete("keyword");
    }

    params.delete("page");

    setSearchParams(params);

    navigate(`/?${params.toString()}`);
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
              value={keyword}
              placeholder="Search destination, hotel, ₹1500..."
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="input-theme rounded-full pr-12"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-brand transition-theme"
            >
              <FiSearch size={18} />
            </button>
          </div>
        </div>

        {/* ================= Right ================= */}

        <div className="flex items-center gap-5">
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
