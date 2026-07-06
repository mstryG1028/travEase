import Navbar from "../components/navbar/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-[var(--background)]
        text-[var(--text-primary)]
        transition-colors
      "
    >
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;
