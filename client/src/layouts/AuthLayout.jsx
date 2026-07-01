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
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <MdTravelExplore className="text-6xl text-[var(--primary)]" />
        </div>

        <h1 className="text-4xl font-bold text-center">{title}</h1>

        <p className="text-center text-gray-500 mt-3">{subtitle}</p>

        <div className="mt-8">{children}</div>

        <p className="text-center mt-8">
          {footerText}

          <Link
            to={footerLink}
            className="ml-2 text-[var(--primary)] font-semibold"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
