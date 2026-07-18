import { Star, MapPin } from "lucide-react";

function RecommendationCards({ recommendations = [] }) {
  return (
    <div
      className="
      space-y-4
      "
    >
      {recommendations.map((item) => {
        const listing = item.listing;

        return (
          <div
            key={listing._id}
            className="
              rounded-xl
              overflow-hidden

              bg-surface

              border
              border-theme

              shadow-theme

              transition-theme

              hover:shadow-theme-lg
              "
          >
            <img
              src={listing.image?.url}
              alt={listing.title}
              className="
                w-full
                h-40
                object-cover
                "
            />

            <div
              className="
                p-4
                "
            >
              <h3
                className="
                  font-semibold
                  text-theme
                  text-lg
                  "
              >
                {listing.title}
              </h3>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  mt-2

                  text-muted
                  "
              >
                <MapPin size={15} />

                {listing.city}
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center

                  mt-3
                  "
              >
                <span
                  className="
                    text-success
                    font-bold
                    "
                >
                  ₹{listing.currentPrice}
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1

                    text-warning
                    "
                >
                  <Star size={15} />

                  {listing.averageRating || 0}
                </span>
              </div>

              <p
                className="
                  mt-4

                  text-muted

                  text-sm
                  "
              >
                🤖 {item.reason}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecommendationCards;
