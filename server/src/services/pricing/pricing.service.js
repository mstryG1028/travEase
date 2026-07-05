import { Listing } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

// =======================================

export async function calculatePrice(listingId) {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  return {
    basePrice: listing.basePrice,
    finalPrice: listing.currentPrice,
  };
}

// =======================================

export async function updatePricing(listingId, body) {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  listing.basePrice = body.basePrice ?? listing.basePrice;
  listing.currentPrice = body.currentPrice ?? listing.currentPrice;

  await listing.save();

  return listing;
}
