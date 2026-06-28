import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      unique: true,
    },

    blockedDates: [
      {
        type: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Availability = mongoose.model("Availability", availabilitySchema);
