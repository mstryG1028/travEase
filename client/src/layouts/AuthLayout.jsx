import { Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div
      className="
        min-h-[85vh]
        flex
        items-center
        justify-center
        bg-[var(--background)]
        px-6
        transition-colors
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[var(--card)]
          border
          border-[var(--border)]
          rounded-3xl
          shadow-xl
          p-8
        "
      >
        <div className="flex justify-center mb-6">
          <MdTravelExplore className="text-6xl text-[var(--primary)]" />
        </div>

        {title && (
          <h1 className="text-4xl font-bold text-center text-[var(--text-primary)]">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="text-center text-[var(--text-secondary)] mt-3">
            {subtitle}
          </p>
        )}

        <div className="mt-8">{children}</div>

        {footerText && footerLink && (
          <p className="text-center mt-8 text-[var(--text-secondary)]">
            {footerText}

            <Link
              to={footerLink}
              className="ml-2 text-[var(--primary)] font-semibold hover:underline"
            >
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthLayout;
