import weatherTool from "./tools/weather.tool.js";
import pricingTool from "./tools/pricing.tool.js";
import reviewTool from "./tools/review.tool.js";
import amenitiesTool from "./tools/amenities.tool.js";
import availabilityTool from "./tools/availability.tool.js";

export default {
  weather: weatherTool,

  pricing: pricingTool,

  reviews: reviewTool,

  amenities: amenitiesTool,

  availability: availabilityTool,
};
