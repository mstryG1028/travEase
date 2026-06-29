import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

function UserDropdown() {
  const { user, logout } = useAuth();

  return (
    <div className="relative group">
      <button className="flex items-center gap-3">
        {user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-4xl text-[var(--primary)]" />
        )}

        <span className="hidden lg:block font-medium">{user?.fullName}</span>
      </button>

      <div
        className="
        absolute
        right-0
        mt-4
        hidden
        group-hover:block
        w-64
        bg-white
        rounded-2xl
        shadow-xl
        border
        border-[var(--border)]
        overflow-hidden
      "
      >
        <div className="px-5 py-4 border-b">
          <h3 className="font-semibold">{user?.fullName}</h3>

          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <Link to="/profile" className="block px-5 py-3 hover:bg-gray-50">
          My Profile
        </Link>

        <Link to="/my-bookings" className="block px-5 py-3 hover:bg-gray-50">
          My Bookings
        </Link>

        <Link to="/dashboard" className="block px-5 py-3 hover:bg-gray-50">
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="
            w-full
            text-left
            px-5
            py-3
            text-red-500
            hover:bg-red-50
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDropdown;
