import axios from "axios";

import { Listing, ListingWeather } from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";

export async function updateWeather(listingId) {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${listing.location.coordinates[1]}&lon=${listing.location.coordinates[0]}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const { data } = await axios.get(url);

  let weather = await ListingWeather.findOne({
    listing: listingId,
  });

  if (!weather) {
    weather = await ListingWeather.create({
      listing: listingId,
    });
  }

  weather.temperature = data.main.temp;
  weather.humidity = data.main.humidity;
  weather.condition = data.weather[0].main;
  weather.windSpeed = data.wind.speed;

  await weather.save();

  return weather;
}

export async function getWeather(listingId) {
  return await ListingWeather.findOne({
    listing: listingId,
  });
}
