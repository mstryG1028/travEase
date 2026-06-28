import { Listing, ListingPricing } from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";

// =======================================

export async function calculatePrice(
  listingId,

  date,
) {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ApiError(
      404,

      "Listing not found",
    );
  }

  const pricing = await ListingPricing.findOne({
    listing: listingId,
  });

  if (!pricing) {
    throw new ApiError(
      404,

      "Pricing not found",
    );
  }

  let price = pricing.basePrice;

  const day = new Date(date).getDay();

  // Weekend

  if (day === 0 || day === 6) {
    price *= pricing.weekendMultiplier;
  }

  // Festivals

  const festivals = ["2026-01-01", "2026-08-15", "2026-10-24", "2026-12-25"];

  const current = new Date(date)

    .toISOString()

    .split("T")[0];

  if (festivals.includes(current)) {
    price *= pricing.festivalMultiplier;
  }

  // Seasonal

  price *= pricing.seasonalMultiplier;

  return {
    basePrice: pricing.basePrice,

    finalPrice: Math.round(price),
  };
}

// =======================================

export async function updatePricing(
  listingId,

  body,
) {
  const pricing = await ListingPricing.findOne({
    listing: listingId,
  });

  if (!pricing) {
    throw new ApiError(
      404,

      "Pricing not found",
    );
  }

  pricing.basePrice = body.basePrice ?? pricing.basePrice;

  pricing.weekendMultiplier =
    body.weekendMultiplier ?? pricing.weekendMultiplier;

  pricing.festivalMultiplier =
    body.festivalMultiplier ?? pricing.festivalMultiplier;

  pricing.seasonalMultiplier =
    body.seasonalMultiplier ?? pricing.seasonalMultiplier;

  pricing.currentPrice = pricing.basePrice;

  await pricing.save();

  return pricing;
}
