import mongoose from "mongoose";

const listingAISchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      unique: true,
    },

    summary: {
      type: String,
      default: "",
    },

    tags: [String],

    score: {
      type: Number,
      default: 0,
    },

    seoDescription: {
      type: String,
      default: "",
    },

    lastGenerated: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const ListingAI = mongoose.model("ListingAI", listingAISchema);
