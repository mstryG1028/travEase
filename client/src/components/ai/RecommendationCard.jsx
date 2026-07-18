import { FaStar, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RecommendationCard({ recommendation }) {
  const { listing, reason } = recommendation;

  return (
    <div
      className="
      bg-surface

      rounded-xl

      shadow-theme

      border
      border-theme

      overflow-hidden

      transition-theme

      hover:shadow-theme-lg
      "
    >
      <img
        src={listing.image?.url}
        alt={listing.title}
        className="
        w-full
        h-56
        object-cover
        "
      />

      <div
        className="
        p-5
        "
      >
        <div
          className="
          flex
          justify-between
          items-center
          gap-3
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            text-theme
            "
          >
            {listing.title}
          </h2>

          <span
            className="
            font-bold
            text-success
            "
          >
            ₹{listing.currentPrice}
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-2

          mt-2

          text-muted
          "
        >
          <FaMapMarkerAlt />

          <span>
            {listing.city}, {listing.state}
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-2

          mt-2

          text-theme
          "
        >
          <FaStar className="text-warning" />

          <span>{listing.averageRating || 0}</span>
        </div>

        <div
          className="
          flex
          items-center
          gap-2

          mt-2

          text-theme
          "
        >
          <FaUsers />

          <span>{listing.guests} Guests</span>
        </div>

        <div
          className="
          mt-4

          flex
          flex-wrap

          gap-2
          "
        >
          {listing.amenities?.slice(0, 5).map((item) => (
            <span
              key={item}
              className="
                bg-surface-2

                text-theme

                px-3
                py-1

                rounded-full

                text-sm

                border
                border-theme
                "
            >
              {item}
            </span>
          ))}
        </div>

        <div
          className="
          mt-5
          "
        >
          <p
            className="
            text-sm
            text-muted
            "
          >
            🤖 {reason}
          </p>
        </div>

        <Link
          to={`/listings/${listing._id}`}
          className="
          inline-flex

          mt-4

          btn-primary

          text-sm
          "
        >
          View Listing
        </Link>
      </div>
    </div>
  );
}
