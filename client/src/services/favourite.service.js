import api from "../api/axios";

export const getWishlist = () => {
  return api.get("/favorites");
};

export const addFavorite = (listingId) => {
  return api.post("/favorites", {
    listing: listingId,
  });
};

export const removeFavorite = (listingId) => {
  return api.delete(`/favorites/${listingId}`);
};
