import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  addFavorite,
  removeFavorite,
} from "../services/favorite.service";

import { successToast, errorToast } from "../utils/toast";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const res = await getWishlist();

      setFavorites(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function isFavorite(listingId) {
    return favorites.some((item) => item.listing._id === listingId);
  }

  async function toggleFavorite(listingId) {
    try {
      if (isFavorite(listingId)) {
        await removeFavorite(listingId);

        setFavorites((prev) =>
          prev.filter((item) => item.listing._id !== listingId),
        );

        successToast("Removed from wishlist");
      } else {
        const res = await addFavorite(listingId);

        setFavorites((prev) => [...prev, res.data.data]);

        successToast("Added to wishlist");
      }
    } catch (err) {
      errorToast(err);
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        loading,
        isFavorite,
        toggleFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}
