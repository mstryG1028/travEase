import weatherService from "../../weather/weather.service.js";
import listingRepository from "../../../repositories/listing.repository.js";
import { success, failure } from "../ai.helper.js";

class WeatherTool {
  async execute({ listingId }) {
  
    try {
      const listing = await listingRepository.findById(listingId);

      if (!listing) {
        return failure("weather", "Listing not found.");
      }

      
      const weather = await weatherService.getWeatherForListing(listingId);

      return success(
        "weather",

        `Current weather in ${listing.city} is ${weather.condition}. Temperature is ${weather.temperature}°C with humidity of ${weather.humidity}%.`,

        {
          title: listing.title,
          city: listing.city,
          weather,
        },
      );
    } catch (err) {
     
      return failure("weather", err.message);
    }
  }
}

export default new WeatherTool();
