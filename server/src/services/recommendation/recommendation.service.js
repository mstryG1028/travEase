import promptService from "./prompt.service.js";
import searchService from "./search.service.js";
import rankingService from "./ranking.service.js";
import ai from "../../config/gemini.js";

class RecommendationService {
  async getRecommendations({ question }) {
    // 1. Extract filters
    const filters = await promptService.extractFilters(question);

    // 2. Search listings
    const listings = await searchService.search(filters);

    if (!listings.length) {
      return {
        filters,
        recommendations: [],
      };
    }

    // 3. Rank listings
    const ranked = rankingService.rank(listings, filters);

    // 4. Generate AI reason for each recommendation
    const recommendations = await Promise.all(
      ranked.map(async ({ listing, score }) => {
        const reason = await this.generateReason(listing, filters);

        return {
          listing,
          score,
          reason,
        };
      }),
    );

    return {
      filters,
      recommendations,
    };
  }

  async generateReason(listing, filters) {
    const prompt = `
You are an AI travel assistant.

Explain in ONE short sentence (maximum 25 words)
why this property matches the user's request.

User Filters:
${JSON.stringify(filters, null, 2)}

Listing:
${JSON.stringify(
  {
    title: listing.title,
    propertyType: listing.propertyType,
    city: listing.city,
    currentPrice: listing.currentPrice,
    amenities: listing.amenities,
    averageRating: listing.averageRating,
  },
  null,
  2,
)}

Return only the sentence.
`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return result.text.trim();
    } catch (error) {
      console.error("Recommendation reason error:", error);

      return "A strong match for your preferences.";
    }
  }
}

export default new RecommendationService();
