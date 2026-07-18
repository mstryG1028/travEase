class RankingService {
  rank(listings, filters) {
    const scoredListings = listings.map((listing) => {
      let score = 0;

      // ==========================
      // Budget (30)
      // ==========================

      if (filters.budget) {
        const difference = Math.abs(listing.currentPrice - filters.budget);

        const percentage = difference / filters.budget;

        const budgetScore = Math.max(0, 30 - percentage * 30);

        score += budgetScore;
      } else {
        score += 15;
      }

      // ==========================
      // Property Type (20)
      // ==========================

      if (
        filters.propertyType &&
        listing.propertyType.toLowerCase() ===
          filters.propertyType.toLowerCase()
      ) {
        score += 20;
      }

      // ==========================
      // Location (15)
      // ==========================

      if (filters.location) {
        const location = filters.location.toLowerCase();

        if (
          listing.city.toLowerCase().includes(location) ||
          listing.state.toLowerCase().includes(location) ||
          listing.country.toLowerCase().includes(location)
        ) {
          score += 15;
        }
      }

      // ==========================
      // Amenities (20)
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
      // Guests (10)
      // ==========================

      if (filters.guests) {
        if (listing.guests >= filters.guests) {
          score += 10;
        } else {
          score += Math.max(0, 10 - (filters.guests - listing.guests) * 2);
        }
      }

      // ==========================
      // Rating (15)
      // ==========================

      score += listing.averageRating * 3;

      // ==========================
      // Reviews (5)
      // ==========================

      score += Math.min(listing.totalReviews / 20, 5);

      // ==========================
      // Trending (5)
      // ==========================

      score += Math.min(listing.trendingScore / 20, 5);

      // ==========================
      // Discount (10)
      // ==========================

      if (listing.basePrice && listing.currentPrice) {
        const discount =
          ((listing.basePrice - listing.currentPrice) / listing.basePrice) *
          100;

        score += Math.min(discount / 2, 10);
      }

      // ==========================
      // Available Bonus
      // ==========================

      if (listing.isAvailable) {
        score += 5;
      }

      return {
        listing,
        score: Number(score.toFixed(2)),
      };
    });

    scoredListings.sort((a, b) => b.score - a.score);

    return scoredListings.slice(0, 5);
  }
}

export default new RankingService();
