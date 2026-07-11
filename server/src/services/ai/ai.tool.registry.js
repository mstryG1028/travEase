import availabilityTool from "./tools/availability.tool.js";
import pricingTool from "./tools/pricing.tool.js";
import weatherTool from "./tools/weather.tool.js";
import amenitiesTool from "./tools/amenities.tool.js";
import reviewTool from "./tools/review.tool.js";

export default {
  availability: availabilityTool,
  pricing: pricingTool,
  weather: weatherTool,
  amenities: amenitiesTool,
  reviews: reviewTool,
};
