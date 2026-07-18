import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    filters: {
      location: {
        type: String,
        default: "",
      },

      propertyType: {
        type: String,
        default: "",
      },

      budget: {
        type: Number,
        default: null,
      },

      guests: {
        type: Number,
        default: null,
      },

      amenities: [
        {
          type: String,
        },
      ],

      keywords: [
        {
          type: String,
        },
      ],

      tripType: {
        type: String,
        default: "",
      },

      travelPurpose: {
        type: String,
        default: "",
      },

      checkIn: {
        type: String,
        default: "",
      },

      checkOut: {
        type: String,
        default: "",
      },
    },
  },

  {
    timestamps: true,
  },
);

// Latest searches first

searchHistorySchema.index({
  user: 1,

  createdAt: -1,
});

export const SearchHistory = mongoose.model(
  "SearchHistory",
  searchHistorySchema,
);
