import promptService from "./prompt.service.js";
import searchService from "./search.service.js";
import rankingService from "./ranking.service.js";
import reasonService from "./reason.service.js";
import { success, failure } from "../ai/ai.helper.js";
import availabilityFilterService from "./availability.filter.service.js";
class RecommendationService {
  async getRecommendations({ question, user }) {
    console.log("========== RECOMMENDATION SERVICE ==========");

    try {
      // ===========================================
      // 1. Extract filters using Gemini
      // ===========================================

      const filters = await promptService.extractFilters(question);

      console.log("Extracted Filters:");
      console.log(filters);

      // ===========================================
      // 2. Search Listings
      // ===========================================

      const listings = await searchService.search(filters);

      console.log(`Listings Found: ${listings.length}`);

      // ===========================================
      // 3. No Listings Found
      // ===========================================

      if (!listings.length) {
        return failure(
          "recommendation",
          "Sorry, I couldn't find any properties matching your requirements.",
          {
            filters,
            recommendations: [],
          },
        );
      }

      // ===========================================
      //  Available Listings
      // ===========================================

      const availableListings = await availabilityFilterService.filter(
        listings,
        filters,
      );

      // ===========================================
      // 4. Rank Listings
      // ===========================================

      const rankedListings = rankingService.rank(availableListings, filters);

      // ===========================================
      // 5. Build Recommendation Objects
      // ===========================================

      const recommendations = rankedListings.map(({ listing, score }) => ({
        listing: {
          _id: listing._id,

          title: listing.title,

          city: listing.city,

          state: listing.state,

          country: listing.country,

          propertyType: listing.propertyType,

          image: listing.image,

          guests: listing.guests,

          bedrooms: listing.bedrooms,

          bathrooms: listing.bathrooms,

          amenities: listing.amenities,

          currentPrice: listing.currentPrice,

          basePrice: listing.basePrice,

          currency: listing.currency,

          averageRating: listing.averageRating,

          totalReviews: listing.totalReviews,

          trendingScore: listing.trendingScore,

          owner: listing.owner,
        },

        score,

        reason: reasonService.generate(listing, filters),
      }));

      console.log(`Returning ${recommendations.length} recommendations`);

      // ===========================================
      // 6. Success Response
      // ===========================================

      return success(
        "recommendation",
        `Found ${recommendations.length} properties matching your preferences.`,
        {
          filters,
          recommendations,
        },
      );
    } catch (err) {
      console.error("RECOMMENDATION SERVICE ERROR");
      console.error(err);

      return failure(
        "recommendation",
        "Unable to generate recommendations at the moment.",
      );
    }
  }
}

export default new RecommendationService();
