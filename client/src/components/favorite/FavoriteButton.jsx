import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { addFavorite, removeFavorite } from "../../services/favorite.service";

function FavoriteButton({ listingId, initialFavorite = false }) {
  const [favorite, setFavorite] = useState(initialFavorite);

  async function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (favorite) {
        await removeFavorite(listingId);

        toast.success("Removed from Wishlist");
      } else {
        await addFavorite(listingId);

        toast.success("Added to Wishlist");
      }

      setFavorite(!favorite);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className="
      absolute
      top-3
      right-3
      bg-white
      p-2
      rounded-full
      shadow-lg
      hover:scale-110
      transition
    "
    >
      {favorite ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-red-500 text-xl" />
      )}
    </button>
  );
}

export default FavoriteButton;
