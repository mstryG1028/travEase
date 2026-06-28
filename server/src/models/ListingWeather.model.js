import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    unique: true,
  },

  temperature: Number,

  humidity: Number,

  condition: String,

  windSpeed: Number,

  forecast: [Object],

  lastUpdated: Date,
});

export const ListingWeather = mongoose.model("ListingWeather", weatherSchema);
