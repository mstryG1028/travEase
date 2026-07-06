import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

function HamburgerMenu({ user, close }) {
  const { logout } = useAuth();

  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      close();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute right-6 top-20 z-50 w-64 overflow-hidden rounded-2xl border border-theme bg-surface shadow-theme transition-theme">
      {/* User */}
      {user?.role === "user" && (
        <>
          <Link
            to="/profile"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            My Profile
          </Link>

          <Link
            to="/my-bookings"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            My Bookings
          </Link>

          <Link
            to="/wishlist"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            Wishlist
          </Link>

          <hr className="border-theme" />
        </>
      )}

      {/* Owner */}
      {user?.role === "owner" && (
        <>
          <Link
            to="/dashboard"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            Dashboard
          </Link>

          <Link
            to="/my-listings"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            My Listings
          </Link>

          <Link
            to="/my-bookings"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            My Bookings
          </Link>

          <Link
            to="/profile"
            onClick={close}
            className="block px-5 py-3 hover-surface transition-theme"
          >
            My Profile
          </Link>

          <hr className="border-theme" />
        </>
      )}

      {/* Common */}

      <button className="w-full px-5 py-3 text-left hover-surface transition-theme">
        Language
      </button>

      <hr className="border-theme" />

      <details>
        <summary className="cursor-pointer px-5 py-3 hover-surface transition-theme">
          Help
        </summary>

        <Link
          to="/about"
          onClick={close}
          className="block py-2 pl-10 hover-surface transition-theme"
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={close}
          className="block py-2 pl-10 hover-surface transition-theme"
        >
          Contact
        </Link>
      </details>

      <div className="px-5 py-4">
        <p className="mb-3 text-xs uppercase tracking-wider muted">
          Appearance
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setTheme("light")}
            className={`flex-1 rounded-xl py-2 flex items-center justify-center gap-2 transition-theme
              ${
                theme === "light"
                  ? "bg-primary text-white"
                  : "bg-surface-2  text-theme hover-surface"
              }`}
          >
            <FaSun />
            Light
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 rounded-xl py-2 flex items-center justify-center gap-2 transition-theme
              ${
                theme === "dark"
                  ? "bg-primary text-white"
                  : "bg-surface-2  text-theme hover-surface"
              }`}
          >
            <FaMoon />
            Dark
          </button>
        </div>
      </div>

      <hr className="border-theme" />
    </div>
  );
}

export default HamburgerMenu;
