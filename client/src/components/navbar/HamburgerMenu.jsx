import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function HamburgerMenu({ user, close }) {
  const { logout } = useAuth();

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
    <div className="absolute right-6 top-20 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">
      {/* Guest */}
      {!user && (
        <>
          <Link
            to="/login"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Sign Up
          </Link>

          <hr />
        </>
      )}

      {/* User */}
      {user?.role === "user" && (
        <>
          <Link
            to="/profile"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            My Profile
          </Link>

          <Link
            to="/bookings"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            My Bookings
          </Link>

          <Link
            to="/wishlist"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Wishlist
          </Link>

          <Link
            to="/become-host"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Become a Host
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-500"
          >
            Logout
          </button>

          <hr />
        </>
      )}

      {/* Owner */}
      {user?.role === "owner" && (
        <>
          <Link
            to="/dashboard"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            My Profile
          </Link>

          <Link
            to="/bookings"
            onClick={close}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Bookings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-500"
          >
            Logout
          </button>

          <hr />
        </>
      )}

      {/* Common */}
      <button className="w-full text-left px-5 py-3 hover:bg-gray-100">
        Language
      </button>

      <details>
        <summary className="px-5 py-3 cursor-pointer hover:bg-gray-100">
          Help
        </summary>

        <Link
          to="/about"
          onClick={close}
          className="block pl-10 py-2 hover:bg-gray-100"
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={close}
          className="block pl-10 py-2 hover:bg-gray-100"
        >
          Contact
        </Link>
      </details>
    </div>
  );
}

export default HamburgerMenu;
