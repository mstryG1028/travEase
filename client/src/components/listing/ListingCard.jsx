import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

import ListingImage from "./ListingImage";

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="
        group
        block
        bg-surface
        rounded-[26px]
        border
        border-theme
        overflow-hidden
        shadow-theme
        hover:shadow-theme-lg
        hover:-translate-y-2
        transition-theme
      "
    >
      <ListingImage image={listing.image?.url} listingId={listing._id} />

      <div className="px-5 py-5">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-theme line-clamp-1">
              {listing.title}
            </h2>

            <p className="mt-2 flex items-center gap-2 muted">
              <FaMapMarkerAlt className="text-xs" />
              {listing.city}, {listing.state}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />

            <span className="font-semibold text-theme">
              {listing.averageRating?.toFixed(1) || "New"}
            </span>
          </div>
        </div>

        {/* Host */}

        <p className="mt-3 muted">
          Hosted by{" "}
          <span className="font-medium text-theme">
            {listing.owner?.fullName || "Unknown"}
          </span>
        </p>

        {/* Divider */}

        <div className="my-5 h-px border-theme border-t" />

        {/* Footer */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-theme">
              ₹{listing.currentPrice}
            </h2>

            <p className="text-sm muted">per night</p>
          </div>

          <button
            className="
              bg-primary
              px-5
              py-2.5
              rounded-full
              text-white
              text-sm
              font-semibold
              transition-theme
              hover:opacity-90
            "
          >
            Book
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
