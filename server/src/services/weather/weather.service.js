import axios from "axios";
import { Listing } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

class WeatherService {
  async getWeatherForListing(listingId) {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    // -------------------------
    // Return cached weather
    // -------------------------

    if (
      listing.weather?.updatedAt &&
      Date.now() - new Date(listing.weather.updatedAt).getTime() < CACHE_TIME
    ) {
      return {
        ...listing.weather.toObject(),
        cached: true,
      };
    }

    const location = `${listing.city},${listing.state},${listing.country}`;

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(location)}` +
      `&appid=${process.env.WEATHER_API_KEY}` +
      `&units=metric`;

    let data;

    try {
      const response = await axios.get(url);
      data = response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new ApiError(
          404,
          `Weather not found for "${listing.city}". Please use a valid city name.`,
        );
      }

      throw new ApiError(500, "Unable to fetch weather from OpenWeather.");
    }
    listing.weather = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      updatedAt: new Date(),
    };

    await listing.save();

    return {
      temperature: listing.weather.temperature,
      humidity: listing.weather.humidity,
      condition: listing.weather.condition,
      updatedAt: listing.weather.updatedAt,
      cached: false,
    };
  }
}

export default new WeatherService();
