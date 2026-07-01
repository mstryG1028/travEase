import { Link } from "react-router-dom";

function WishlistCard({ item }) {
  const listing = item.listing;

  return (
    <Link
      to={`/listings/${listing._id}`}
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      shadow
      hover:shadow-xl
      transition
    "
    >
      <img
        src={listing.image?.url}
        alt={listing.title}
        className="h-60 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="font-bold text-xl">{listing.title}</h2>

        <p className="text-gray-500 mt-2">{listing.city}</p>

        <h3 className="mt-3 font-bold text-2xl text-[var(--primary)]">
          ₹ {listing.currentPrice}
        </h3>
      </div>
    </Link>
  );
}

export default WishlistCard;
