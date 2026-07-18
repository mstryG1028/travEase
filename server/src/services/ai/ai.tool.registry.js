import weatherTool from "./tools/weather.tool.js";
import pricingTool from "./tools/pricing.tool.js";
import reviewTool from "./tools/review.tool.js";
import amenitiesTool from "./tools/amenities.tool.js";
import availabilityTool from "./tools/availability.tool.js";
import recommendationTool from "./tools/recommendation.tool.js";

const tools = {
  weather: weatherTool,
  pricing: pricingTool,
  review: reviewTool,
  reviews: reviewTool,
  amenities: amenitiesTool,
  availability: availabilityTool,
  recommendation: recommendationTool,
};

export default tools;
