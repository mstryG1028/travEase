import { NavLink } from "react-router-dom";

function CustomNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        relative
        pb-1
        font-medium
        transition-all
        duration-300

        ${
          isActive
            ? "text-[var(--primary)]"
            : "text-[var(--text-primary)] hover:text-[var(--primary)]"
        }

        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-[var(--primary)]
        after:transition-all
        after:duration-300

        hover:after:w-full

        ${isActive ? "after:w-full" : ""}
      `
      }
    >
      {children}
    </NavLink>
  );
}

export default CustomNavLink;
