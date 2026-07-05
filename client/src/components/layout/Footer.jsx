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
  return (
    <footer
      className="mt-auto text-white"
      style={{ backgroundColor: "#1F2937" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              TravEase
            </h2>

            <p className="text-gray-300 mt-5 leading-7">
              Discover premium hotels, villas, resorts and unforgettable travel
              experiences across India and around the world.
            </p>

            <div className="flex gap-4 mt-6">
              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300"
                  style={{
                    background: "rgba(255,255,255,.08)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,.08)")
                  }
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Explore</h3>

            <ul className="space-y-4 text-gray-300">
              <li className="hover:text-white cursor-pointer transition">
                Hotels
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Villas
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Resorts
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Homestays
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Apartments
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>

            <ul className="space-y-4 text-gray-300">
              <li className="hover:text-white cursor-pointer transition">
                Help Center
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Safety Information
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Cancellation Policy
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>

            <div className="space-y-5 text-gray-300">
              <div className="flex gap-3">
                <FaMapMarkerAlt
                  className="mt-1"
                  style={{ color: "var(--primary)" }}
                />
                <span>Mumbai, Maharashtra, India</span>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt style={{ color: "var(--primary)" }} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope style={{ color: "var(--primary)" }} />
                <span>support@travease.com</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
          style={{ borderColor: "rgba(255,255,255,.1)" }}
        >
          <p>© 2026 TravEase. All Rights Reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-white cursor-pointer transition">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;