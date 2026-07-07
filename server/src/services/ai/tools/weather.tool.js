import weatherService from "../../weather/weather.service.js";

class WeatherTool {
  async execute(listing) {
    return await weatherService.getWeatherForListing(listing.id);
  }
}

export default new WeatherTool();
