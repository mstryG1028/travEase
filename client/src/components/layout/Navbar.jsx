import { useState } from "react";

import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";

import { MdTravelExplore } from "react-icons/md";

import { IoNotificationsOutline } from "react-icons/io5";

import { BsChatDots } from "react-icons/bs";

import CustomNavLink from "../ui/NavLink";

import MobileMenu from "../ui/MobileMenu";

import UserDropdown from "../ui/UserDropdown";

function Navbar() {
  const [open, setOpen] = useState(false);

  const isLoggedIn = false;

  return (
    <>
      <nav
        className="
        sticky
        top-0
        z-50
        backdrop-blur-lg
        bg-white/80
        border-b
        border-[var(--border)]
      "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          h-20
          flex
          justify-between
          items-center
        "
        >
          {/* Logo */}

          <Link to="/" className="flex items-center gap-2">
            <MdTravelExplore className="text-4xl text-[var(--primary)]" />

            <span
              className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-[var(--primary)]
              to-[var(--secondary)]
              bg-clip-text
              text-transparent
            "
            >
              TravEase
            </span>
          </Link>

          {/* Desktop Menu */}

          <div
            className="
            hidden
            md:flex
            gap-8
          "
          >
            <CustomNavLink to="/">Home</CustomNavLink>

            <CustomNavLink to="/listings">Explore</CustomNavLink>

            <CustomNavLink to="/about">About</CustomNavLink>

            <CustomNavLink to="/contact">Contact</CustomNavLink>
          </div>

          {/* Right */}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="relative">
                  <IoNotificationsOutline className="text-2xl" />

                  <span
                    className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    rounded-full
                    px-2
                  "
                  >
                    3
                  </span>
                </button>

                <BsChatDots className="text-2xl" />

                <UserDropdown />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                  hidden
                  md:block
                  border
                  border-[var(--primary)]
                  text-[var(--primary)]
                  px-5
                  py-2
                  rounded-xl
                  hover:bg-[var(--primary)]
                  hover:text-white
                  duration-300
                "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                  hidden
                  md:block
                  bg-[var(--primary)]
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  hover:bg-[var(--primary-dark)]
                "
                >
                  Sign Up
                </Link>
              </>
            )}

            <button className="md:hidden" onClick={() => setOpen(!open)}>
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>

        <MobileMenu open={open} />
      </nav>
    </>
  );
}

export default Navbar;
