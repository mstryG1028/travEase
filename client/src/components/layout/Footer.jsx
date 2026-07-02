function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-bold">TravEase</h2>

            <p className="text-gray-500 mt-4 leading-7">
              Find premium homes, hotels and unforgettable stays around the
              world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Support</h3>

            <div className="space-y-3 text-gray-500">
              <p>Help Center</p>
              <p>Cancellation</p>
              <p>Safety</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Hosting</h3>

            <div className="space-y-3 text-gray-500">
              <p>Become Host</p>
              <p>Community</p>
              <p>Resources</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-5">Company</h3>

            <div className="space-y-3 text-gray-500">
              <p>About</p>
              <p>Careers</p>
              <p>Contact</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-sm text-gray-500">
          © 2026 TravEase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
