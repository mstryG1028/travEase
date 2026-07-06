import { useEffect, useState } from "react";
import * as favoriteService from "../services/favorite.service";

function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const res = await favoriteService.getWishlist();
      setFavorites(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ NEW: remove from UI instantly
  function removeFromUI(listingId) {
    setFavorites((prev) =>
      prev.filter((item) => item.listing._id !== listingId),
    );
  }

  return {
    favorites,
    loading,
    fetchFavorites,
    removeFromUI,
  };
}

export default useFavorites;
