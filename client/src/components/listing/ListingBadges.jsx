function ListingBadges({
  trending,

  ai,

  weather,
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {trending && (
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          🏆 Trending
        </span>
      )}

      {ai && (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          🤖 AI Pick
        </span>
      )}

      {weather && (
        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
          🌤 {weather}
        </span>
      )}
    </div>
  );
}

export default ListingBadges;
