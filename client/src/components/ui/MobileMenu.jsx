import { Link } from "react-router-dom";

function MobileMenu({ open }) {
  if (!open) return null;

  return (
    <div
      className="
      md:hidden
      bg-white
      border-t
      border-[var(--border)]
      px-6
      py-6
      flex
      flex-col
      gap-5
    "
    >
      <Link to="/">Home</Link>

      <Link to="/listings">Explore</Link>

      <Link to="/about">About</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/login">Login</Link>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default MobileMenu;
