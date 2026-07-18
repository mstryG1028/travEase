import { Link } from "react-router-dom";

export default function RecommendationMessage({ recommendations = [] }) {
  return (
    <div
      className="
      space-y-4
      "
    >
      {recommendations.map(({ listing, reason }) => (
        <div
          key={listing._id}
          className="
            rounded-xl

            border
            border-theme

            bg-surface

            overflow-hidden

            shadow-theme

            transition-theme

            hover:shadow-theme-lg
            "
        >
          <img
            src={listing.image?.url}
            className="
              w-full
              h-44
              object-cover
              "
            alt={listing.title}
          />

          <div
            className="
              p-4
              "
          >
            <h2
              className="
                font-semibold
                text-lg
                text-theme
                "
            >
              {listing.title}
            </h2>

            <p
              className="
                text-sm
                text-muted
                "
            >
              {listing.city}, {listing.state}
            </p>

            <div
              className="
                mt-2

                flex
                justify-between

                text-theme
                "
            >
              <span>⭐ {listing.averageRating || 0}</span>

              <span
                className="
                  font-semibold
                  text-success
                  "
              >
                ₹{listing.currentPrice}
              </span>
            </div>

            <p
              className="
                mt-4

                text-sm

                text-muted
                "
            >
              🤖 {reason}
            </p>

            <Link
              to={`/listing/${listing._id}`}
              className="
                inline-block

                mt-4

                btn-primary
                "
            >
              View Listing
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
