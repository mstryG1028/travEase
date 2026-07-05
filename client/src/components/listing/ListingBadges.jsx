function ListingBadges({ trending, ai, weather }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {trending && (
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            background: "var(--warning-light)",
            color: "var(--warning)",
          }}
        >
          🏆 Trending
        </span>
      )}

      {ai && (
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            background: "var(--success-light)",
            color: "var(--success)",
          }}
        >
          🤖 AI Pick
        </span>
      )}

      {weather && (
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            background: "var(--info-light)",
            color: "var(--info)",
          }}
        >
          🌤 {weather}
        </span>
      )}
    </div>
  );
}

export default ListingBadges;
