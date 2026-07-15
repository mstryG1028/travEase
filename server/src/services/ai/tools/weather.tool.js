import weatherService from "../../weather/weather.service.js";

class WeatherTool {
  async execute({ listing }) {
    return await weatherService.getWeatherForListing(listing._id);
  }
}

export default new WeatherTool();
