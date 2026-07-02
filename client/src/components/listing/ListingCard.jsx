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
      bg-white
      rounded-[26px]
      border
      border-gray-100
      overflow-hidden

      shadow-[0_8px_30px_rgba(15,23,42,0.08)]

      hover:shadow-[0_18px_45px_rgba(15,23,42,0.15)]

      hover:-translate-y-2

      duration-500
      "
    >
      <ListingImage image={listing.image?.url} listingId={listing._id} />

      <div className="px-5 py-5">
        {/* Rating */}

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 line-clamp-1">
              {listing.title}
            </h2>

            <p className="flex items-center gap-2 text-gray-500 mt-2">
              <FaMapMarkerAlt className="text-xs" />
              {listing.city}, {listing.state}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />

            <span className="font-semibold">
              {listing.averageRating?.toFixed(1) || "New"}
            </span>
          </div>
        </div>

        {/* Host */}

        <p className="mt-3 text-gray-500">
          Hosted by{" "}
          <span className="text-slate-700 font-medium">
            {listing.owner?.fullName || "Unknown"}
          </span>
        </p>

        {/* Divider */}

        <div className="h-px bg-gray-100 my-5" />

        {/* Footer */}

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              ₹{listing.currentPrice}
            </h2>

            <p className="text-sm text-gray-500">per night</p>
          </div>

          <button
            className="
            px-5
            py-2.5

            rounded-full

            bg-[var(--primary)]

            text-white

            text-sm

            font-semibold

            hover:scale-105

            duration-300
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
