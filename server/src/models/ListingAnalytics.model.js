import mongoose from "mongoose";

const listingAnalyticsSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      unique: true,
    },

    totalViews: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    revenue: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    occupancyRate: {
      type: Number,
      default: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const ListingAnalytics = mongoose.model(
  "ListingAnalytics",
  listingAnalyticsSchema,
);
