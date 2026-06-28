import mongoose from "mongoose";

const flashbackSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    images: [
      {
        url: String,

        public_id: String,
      },
    ],

    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Flashback = mongoose.model(
  "Flashback",

  flashbackSchema,
);
