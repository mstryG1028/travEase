import { Listing } from "../models/index.js";
import { syncWeather } from "../services/weather/weather.service.js";

export async function updateAllWeather() {
  const listings = await Listing.find();

  for (const listing of listings) {
    await syncWeather(listing._id);
  }
}
