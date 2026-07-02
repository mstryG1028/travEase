function HeroStats() {
  const stats = [
    {
      number: "500+",

      title: "Listings",
    },

    {
      number: "10K+",

      title: "Happy Guests",
    },

    {
      number: "4.9",

      title: "Average Rating",
    },

    {
      number: "100+",

      title: "Cities",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((item) => (
        <div key={item.title} className="text-center">
          <h2 className="text-4xl font-bold text-[var(--primary)]">
            {item.number}
          </h2>

          <p className="text-gray-500">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;
