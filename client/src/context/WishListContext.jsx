import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/favorite.service";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  async function fetchWishlist() {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function isWishlisted(id) {
    return wishlist.some(
      (item) => item.listing?._id === id || item.listing === id,
    );
  }

  async function toggleWishlist(id) {
    if (!user) {
      toast.error("Please login to add wishlist.");
      return;
    }

    try {
      if (isWishlisted(id)) {
        await removeFromWishlist(id);

        setWishlist((prev) => prev.filter((item) => item.listing?._id !== id));

        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(id);

        const latest = await getWishlist();

        setWishlist(latest);

        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}
