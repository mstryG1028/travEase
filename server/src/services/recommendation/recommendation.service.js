import promptService from "./prompt.service.js";
import searchService from "./search.service.js";
import rankingService from "./ranking.service.js";
import reasonService from "./reason.service.js";

class RecommendationService {
  async getRecommendations({ question }) {
    // 1. Extract filters using Gemini
    const filters = await promptService.extractFilters(question);

    // 2. Search listings from MongoDB
    const listings = await searchService.search(filters);

  
    if (!listings.length) {
      return {
        filters,
        recommendations: [],
      };
    }

    // 3. Rank listings
    const ranked = rankingService.rank(listings, filters);

    // 4. Generate reasons using JavaScript (NO GEMINI)
    const recommendations = ranked.map(({ listing, score }) => ({
      listing,
      score,
      reason: reasonService.generate(listing, filters),
    }));

    console.log(recommendations)
    return {
      filters,
      recommendations,
    };
  }
}

export default new RecommendationService();
