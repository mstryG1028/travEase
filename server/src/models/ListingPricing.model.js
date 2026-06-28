import mongoose from "mongoose";

const listingPricingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      unique: true,
    },

    basePrice: Number,

    currentPrice: Number,

    weekendMultiplier: {
      type: Number,
      default: 1.2,
    },

    festivalMultiplier: {
      type: Number,
      default: 1.5,
    },

    seasonalMultiplier: {
      type: Number,
      default: 1,
    },

    aiSuggestedPrice: {
      type: Number,
      default: 0,
    },

    dynamicPricing: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ListingPricing = mongoose.model(
  "ListingPricing",
  listingPricingSchema,
);
