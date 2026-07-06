import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as favoriteService from "../../services/favorite.service";
import useFavorites from "../../hooks/useFavorites";
import { errorToast } from "../../utils/toast";

function WishlistButton({ listingId }) {
  const navigate = useNavigate();

  const { favorites, fetchFavorites } = useFavorites();

  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const exists = favorites.some((f) => f.listing._id === listingId);
    setIsFav(exists);
  }, [favorites, listingId]);

  async function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    // 🚨 NOT LOGGED IN CHECK
    if (!token) {
      errorToast("Please login first to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      if (isFav) {
        await favoriteService.removeFavorite(listingId);
      } else {
        await favoriteService.addFavorite(listingId);
      }

      await fetchFavorites();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-3 right-3 text-2xl z-10"
    >
      <FaHeart className={isFav ? "text-red-500" : "text-white"} />
    </button>
  );
}

export default WishlistButton;
