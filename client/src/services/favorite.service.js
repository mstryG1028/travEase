import api from "../api/axios";

export const getWishlist = () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve({ data: { data: [] } });

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
