class RankingService {
  rank(listings, filters) {
    const scoredListings = listings.map((listing) => {
      let score = 0;

      // ==========================
      // Budget Match (30 Points)
      // ==========================

      if (filters.budget) {
        const difference = Math.abs(filters.budget - listing.currentPrice);

        const percentage = difference / filters.budget;

        score += Math.max(0, 30 - percentage * 30);
      } else {
        score += 20;
      }

      // ==========================
      // Property Type (20 Points)
      // ==========================

      if (
        filters.propertyType &&
        listing.propertyType.toLowerCase() ===
          filters.propertyType.toLowerCase()
      ) {
        score += 20;
      }

      // ==========================
      // Amenities (20 Points)
      // ==========================

      if (filters.amenities.length) {
        const matched = filters.amenities.filter((amenity) =>
          listing.amenities.some(
            (item) => item.toLowerCase() === amenity.toLowerCase(),
          ),
        ).length;

        score += (matched / filters.amenities.length) * 20;
      }

      // ==========================
      // Guests (10 Points)
      // ==========================

      if (filters.guests && listing.guests >= filters.guests) {
        score += 10;
      }

      // ==========================
      // Rating (10 Points)
      // ==========================

      score += listing.averageRating * 2;

      // ==========================
      // Reviews (5 Points)
      // ==========================

      score += Math.min(listing.totalReviews / 20, 5);

      // ==========================
      // Trending (5 Points)
      // ==========================

      score += Math.min(listing.trendingScore / 20, 5);

      return {
        listing,
        score: Number(score.toFixed(2)),
      };
    });

    scoredListings.sort((a, b) => b.score - a.score);

    return scoredListings.slice(0, 3);
  }
}

export default new RankingService();
