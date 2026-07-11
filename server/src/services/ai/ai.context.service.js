import listingRepository from "../../repositories/listing.repository.js";
import reviewRepository from "../../repositories/review.repository.js";
import availabilityRepository from "../../repositories/availability.repository.js";

import PricingService from "../pricing/pricing.service.js";
import weatherService from "../weather/weather.service.js";

import ApiError from "../../utils/ApiError.js";

class AIContextService {
  // =====================================
  // Get Complete Listing Context
  // =====================================
  async getListingContext(listingId) {
    const listing = await listingRepository.findById(listingId);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    const [reviews, availability, pricing, weather] = await Promise.all([
      reviewRepository.find({
        listing: listingId,
      }),

      availabilityRepository.find({
        listing: listingId,
      }),

      pricingService.getPricing(listingId),

      weatherService.getWeatherForListing(listing),
    ]);

    return {
      listing,
      reviews,
      availability,
      pricing,
      weather,
    };
  }
}

export default new AIContextService();
