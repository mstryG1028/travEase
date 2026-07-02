import SearchBar from "./SearchBar";

function Hero() {
  return (
    <section
      className="
      bg-gradient-to-b
      from-white
      to-rose-50
      py-20
      "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1
          className="
          text-6xl
          font-bold
          leading-tight
          "
        >
          Find your
          <span className="text-rose-500"> perfect stay</span>
        </h1>

        <p
          className="
          mt-6
          text-xl
          text-gray-500
          "
        >
          Villas • Hotels • Apartments • Resorts
        </p>

        <div className="mt-12">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
