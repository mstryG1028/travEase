import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { removeFavorite } from "../../services/favorite.service";

function WishlistCard({ item, onRemove }) {
  const listing = item.listing;

  async function handleRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await removeFavorite(listing._id);

      // ✅ instant UI update
      onRemove(listing._id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Link
      to={`/listings/${listing._id}`}
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition relative"
    >
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <FaTrash className="text-red-500" />
      </button>

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
