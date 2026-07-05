function PopularDestinations() {
  const places = [
    "🏖 Goa",
    "🏔 Manali",
    "🌊 Maldives",
    "🏕 Rishikesh",
    "🏜 Jaisalmer",
    "🌲 Ooty",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {places.map((place) => (
        <button
          key={place}
          className="
            px-5
            py-3
            rounded-full
            bg-surface
            text-primary
            shadow-theme-sm
            border
            border-theme
            transition-theme
            hover:bg-primary
            hover:text-white
          "
        >
          {place}
        </button>
      ))}
    </div>
  );
}

export default PopularDestinations;
