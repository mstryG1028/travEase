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
bg-white
shadow
hover:bg-[var(--primary)]
hover:text-white
duration-300
"
        >
          {place}
        </button>
      ))}
    </div>
  );
}

export default PopularDestinations;
