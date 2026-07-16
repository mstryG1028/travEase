import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

function RecommendationCards({ recommendations }) {
  return (
    <div className="space-y-4">
      {recommendations.map((item) => {
        const listing = item.listing;

        return (
          <div
            key={listing._id}
            className="rounded-xl overflow-hidden bg-slate-800 border border-slate-700"
          >
            <img
              src={listing.image.url}
              alt={listing.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-white text-lg">
                {listing.title}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-slate-300">
                <MapPin size={15} />

                {listing.city}
              </div>

              <div className="flex justify-between mt-3">
                <span className="text-emerald-400 font-bold">
                  ₹{listing.currentPrice}
                </span>

                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={15} />

                  {listing.averageRating}
                </span>
              </div>

              <p className="mt-4 text-slate-300 text-sm">🤖 {item.reason}</p>

              <Link
                to={`/listing/${listing._id}`}
                className="inline-block mt-4 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-white text-sm"
              >
                View Listing
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecommendationCards;
