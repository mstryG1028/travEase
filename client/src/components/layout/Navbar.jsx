import { Link } from "react-router-dom";
import { useState } from "react";

import { FaBars, FaSearch } from "react-icons/fa";

import { MdTravelExplore } from "react-icons/md";

import MobileMenu from "../ui/MobileMenu";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-xl
        border-b
        border-[var(--border)]
        shadow-sm
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          h-20
          px-6
          flex
          items-center
          justify-between
          "
        >
          {/* LEFT */}

          <Link to="/" className="flex items-center gap-3">
            <div
              className="
              w-10
              h-10
              rounded-full
              bg-[var(--primary)]
              flex
              items-center
              justify-center
              text-white
              "
            >
              <MdTravelExplore size={22} />
            </div>

            <div>
              <h2 className="font-bold text-xl">TravEase</h2>

              <p
                className="
                text-xs
                text-gray-500
                "
              >
                Explore
              </p>
            </div>
          </Link>

          {/* SEARCH */}

          <div
            className="
            hidden
            md:flex
            items-center
            w-[420px]
            border
            border-gray-200
            rounded-full
            overflow-hidden
            shadow-sm
            "
          >
            <input
              type="text"
              placeholder="Search..."
              className="
              flex-1
              px-5
              py-3
              outline-none
              "
            />

            <button
              className="
              h-full
              px-6
              bg-[var(--primary)]
              text-white
              hover:bg-[var(--primary-dark)]
              duration-300
              "
            >
              <FaSearch />
            </button>
          </div>

          {/* RIGHT */}

          <div
            className="
            hidden
            md:flex
            items-center
            gap-6
            "
          >
            <Link
              to="/host"
              className="
              font-medium
              hover:text-[var(--primary)]
              "
            >
              Become a host
            </Link>

            <Link
              to="/register"
              className="
              hover:text-[var(--primary)]
              "
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="
              hover:text-[var(--primary)]
              "
            >
              Log in
            </Link>

            <button
              className="
              w-11
              h-11
              rounded-full
              border
              flex
              justify-center
              items-center
              hover:shadow-lg
              "
              onClick={() => setOpen(!open)}
            >
              <FaBars />
            </button>
          </div>

          {/* MOBILE */}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <FaBars size={22} />
          </button>
        </div>

        <MobileMenu open={open} />
      </nav>
    </>
  );
}

export default Navbar;
