import { Link } from "react-router-dom";

export default function RecommendationMessage({ recommendations }) {
  return (
    <div className="space-y-4">
      {recommendations.map(({ listing, reason }) => (
        <div
          key={listing._id}
          className="rounded-xl border bg-white overflow-hidden shadow-sm"
        >
          <img
            src={listing.image.url}
            className="w-full h-44 object-cover"
            alt={listing.title}
          />

          <div className="p-4">
            <h2 className="font-semibold text-lg">{listing.title}</h2>

            <p className="text-sm text-gray-500">
              {listing.city}, {listing.state}
            </p>

            <div className="mt-2 flex justify-between">
              <span>⭐ {listing.averageRating}</span>

              <span>₹{listing.currentPrice}</span>
            </div>

            <p className="mt-4 text-sm">🤖 {reason}</p>

            <Link
              to={`/listing/${listing._id}`}
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
            >
              View Listing
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
