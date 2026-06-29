function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-[var(--primary)]">
          TravEase
        </h2>

        <p className="mt-4 text-gray-300">
          Discover. Stay. Relax.
        </p>

        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between">

          <p>© 2026 TravEase</p>

          <p>Made with ❤️ using MERN</p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;