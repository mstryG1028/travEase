import promptService from "./prompt.service.js";
import searchService from "./search.service.js";
import rankingService from "./ranking.service.js";
import reasonService from "./reason.service.js";
import { success, failure } from "../ai/ai.helper.js";
import availabilityFilterService from "./availability.filter.service.js";
import userProfileService from "./user.profile.service.js";
import searchHistoryService from "./search-history.service.js";

class RecommendationService {
  async getRecommendations({ question, user }) {
    console.log("========== RECOMMENDATION SERVICE ==========");

    try {
      /*
======================================
1. Extract AI Filters
======================================
*/

      const filters = await promptService.extractFilters(question);

      console.log("Extracted Filters:", filters);

      /*
======================================
2. Save Search History
======================================
*/

      if (user?._id) {
        await searchHistoryService.saveSearch({
          userId: user._id,

          question,

          filters,
        });
      }

      /*
======================================
3. Get User Profile
======================================
*/

      const userProfile = await userProfileService.getUserProfile(user?._id);

      console.log("User Profile:", userProfile);

      /*
======================================
4. Merge Personal Preferences
======================================
*/

      const finalFilters = {
        ...filters,

        // User did not mention location
        // use previous preference

        location:
          filters.location || userProfile?.preferredLocations?.[0] || "",

        propertyType:
          filters.propertyType ||
          userProfile?.preferredPropertyTypes?.[0] ||
          "",

        amenities: [
          ...new Set([
            ...(filters.amenities || []),

            ...(userProfile?.preferredAmenities || []),
          ]),
        ],
      };

      console.log("Final Recommendation Filters:", finalFilters);

      /*
======================================
5. Search Listings
======================================
*/

      const listings = await searchService.search(finalFilters);

      console.log("Listings Found:", listings.length);

      if (!listings.length) {
        return failure(
          "recommendation",

          "Sorry, I couldn't find properties matching your preferences.",

          {
            filters: finalFilters,

            recommendations: [],
          },
        );
      }

      /*
======================================
6. Availability Check
======================================
*/

      const availableListings = await availabilityFilterService.filter(
        listings,

        finalFilters,
      );

      console.log("Available Listings:", availableListings.length);

      /*
======================================
7. Personalized Ranking
======================================
*/

      const rankedListings = rankingService.rank(
        availableListings,

        finalFilters,

        userProfile,
      );

      /*
======================================
8. Response Builder
======================================
*/

      const recommendations = rankedListings.map(({ listing, score }) => ({
        listing,

        score,

        reason: reasonService.generate(
          listing,

          finalFilters,

          userProfile,
        ),
      }));

      console.log(`Returning ${recommendations.length} recommendations`);

      return success(
        "recommendation",

        `Found ${recommendations.length} personalized properties.`,

        {
          filters: finalFilters,

          userProfile,

          recommendations,
        },
      );
    } catch (error) {
      console.error("RECOMMENDATION ERROR", error);

      return failure(
        "recommendation",

        "Unable to generate recommendations.",
      );
    }
  }
}

export default new RecommendationService();
