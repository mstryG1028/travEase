import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

import ListingImage from "./ListingImage";
import ListingBadges from "./ListingBadges";
import ListingFooter from "./ListingFooter";

function ListingCard({ listing }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-2
    "
    >
      <ListingImage image={listing.image?.url} listingId={listing._id} />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">{listing.title}</h2>

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />

            {listing.averageRating.toFixed(1)}
          </div>
        </div>

        <p className="flex items-center gap-2 text-gray-500 mt-3">
          <FaMapMarkerAlt />
          {listing.city}, {listing.state}
        </p>

        <p className="mt-3">
          Hosted by
          <strong> {listing.owner.fullName}</strong>
        </p>

        <ListingBadges
          trending={listing.trendingScore > 0}
          ai={false}
          weather={null}
        />

        <ListingFooter price={listing.currentPrice} />

        <Link
          to={`/listings/${listing._id}`}
          className="
          inline-block
          mt-5
          text-[var(--primary)]
          font-semibold
        "
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default ListingCard;
