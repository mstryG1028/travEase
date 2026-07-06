import api from "../api/axios";

// Get all wishlist items
export async function getWishlist() {
  const { data } = await api.get("/favorites");
  return data.data;
}

// Add listing to wishlist
export async function addToWishlist(listingId) {
  const { data } = await api.post("/favorites", {
    listing: listingId,
  });

  return data;
}

// Remove listing from wishlist
export async function removeFromWishlist(listingId) {
  const { data } = await api.delete(`/favorites/${listingId}`);
  return data;
}
