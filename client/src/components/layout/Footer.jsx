import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const socials = [FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn];

  return (
    <footer className="bg-[var(--surface)] text-[var(--text-primary)] border-t border-[var(--border)] mt-auto transition-theme">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-[var(--primary)]">
              TravEase
            </h2>

            <p className="mt-5 leading-7 text-[var(--text-secondary)]">
              Discover premium hotels, villas, resorts and unforgettable travel
              experiences across India and around the world.
            </p>

            <div className="mt-6 flex gap-4">
              {socials.map((Icon, index) => (
                <div
                  key={index}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-theme cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-[var(--text-primary)]">
              Explore
            </h3>

            <ul className="space-y-4 text-[var(--text-secondary)]">
              {["Hotels", "Villas", "Resorts", "Homestays", "Apartments"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-[var(--primary)] cursor-pointer transition-theme"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-[var(--text-primary)]">
              Support
            </h3>

            <ul className="space-y-4 text-[var(--text-secondary)]">
              {[
                "Help Center",
                "Safety Information",
                "Cancellation Policy",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[var(--primary)] cursor-pointer transition-theme"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-[var(--text-primary)]">
              Contact
            </h3>

            <div className="space-y-5 text-[var(--text-secondary)]">
              <p className="flex gap-3">
                <FaMapMarkerAlt className="text-[var(--primary)] mt-1" />
                Mumbai, Maharashtra, India
              </p>

              <p className="flex gap-3">
                <FaPhoneAlt className="text-[var(--primary)]" />
                +91 98765 43210
              </p>

              <p className="flex gap-3">
                <FaEnvelope className="text-[var(--primary)]" />
                support@travease.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm md:flex-row text-[var(--text-secondary)]">
          <p>© 2026 TravEase. All Rights Reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-[var(--primary)] cursor-pointer transition-theme">
              Privacy
            </span>
            <span className="hover:text-[var(--primary)] cursor-pointer transition-theme">
              Terms
            </span>
            <span className="hover:text-[var(--primary)] cursor-pointer transition-theme">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
