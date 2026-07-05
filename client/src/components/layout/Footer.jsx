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
    <footer className="footer-theme mt-auto">
      <div className="container-theme py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-brand">TravEase</h2>

            <p className="footer-muted mt-5 leading-7">
              Discover premium hotels, villas, resorts and unforgettable travel
              experiences across India and around the world.
            </p>

            <div className="mt-6 flex gap-4">
              {socials.map((Icon, index) => (
                <div key={index} className="footer-icon">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}

          <div>
            <h3 className="mb-6 text-lg font-semibold">Explore</h3>

            <ul className="space-y-4">
              {["Hotels", "Villas", "Resorts", "Homestays", "Apartments"].map(
                (item) => (
                  <li key={item} className="footer-link">
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-6 text-lg font-semibold">Support</h3>

            <ul className="space-y-4">
              {[
                "Help Center",
                "Safety Information",
                "Cancellation Policy",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item} className="footer-link">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact</h3>

            <div className="space-y-5 footer-muted">
              <p className="flex gap-3">
                <FaMapMarkerAlt className="text-brand mt-1" />
                Mumbai, Maharashtra, India
              </p>

              <p className="flex gap-3">
                <FaPhoneAlt className="text-brand" />
                +91 98765 43210
              </p>

              <p className="flex gap-3">
                <FaEnvelope className="text-brand" />
                support@travease.com
              </p>
            </div>
          </div>
        </div>

        <div className="footer-divider mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm md:flex-row">
          <p className="footer-muted">© 2026 TravEase. All Rights Reserved.</p>

          <div className="flex gap-6">
            <span className="footer-link">Privacy</span>
            <span className="footer-link">Terms</span>
            <span className="footer-link">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
