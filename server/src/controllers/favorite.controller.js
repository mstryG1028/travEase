import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import favoriteService from "../services/favorite/favorite.service.js";

// ======================================
// Add Favorite
// ======================================

export const addFavorite = asyncHandler(async (req, res) => {
  const favorite = await favoriteService.addFavorite(
    req.user._id,
    req.body.listing,
  );

  return res
    .status(201)
    .json(new ApiResponse(201, favorite, "Added To Wishlist"));
});

// ======================================
// My Wishlist
// ======================================

export const getWishlist = asyncHandler(async (req, res) => {
  const favorites = await favoriteService.getWishlist(req.user._id);

  return res.status(200).json(new ApiResponse(200, favorites, "Success"));
});

// ======================================
// Remove Favorite
// ======================================

export const removeFavorite = asyncHandler(async (req, res) => {
  await favoriteService.removeFavorite(req.user._id, req.params.listingId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Removed From Wishlist"));
});
