class RankingService {
  rank(listings, filters, userProfile = {}) {
    const scoredListings = listings.map((listing) => {
      let score = 0;

      // =====================================
      // 1. Current Search Budget Match
      // =====================================

      if (filters.budget) {
        const difference = Math.abs(filters.budget - listing.currentPrice);

        const percentage = difference / filters.budget;

        score += Math.max(0, 25 - percentage * 25);
      } else {
        score += 15;
      }

      // =====================================
      // 2. Property Type Match
      // =====================================

      if (
        filters.propertyType &&
        listing.propertyType?.toLowerCase() ===
          filters.propertyType.toLowerCase()
      ) {
        score += 15;
      }

      // =====================================
      // 3. Amenities Match
      // =====================================

      if (filters.amenities && filters.amenities.length) {
        const matched = filters.amenities.filter((amenity) =>
          listing.amenities?.some(
            (item) => item.toLowerCase() === amenity.toLowerCase(),
          ),
        ).length;

        score += (matched / filters.amenities.length) * 15;
      }

      // =====================================
      // 4. Guest Capacity
      // =====================================

      if (filters.guests && listing.guests >= filters.guests) {
        score += 10;
      }

      // =====================================
      // 5. Rating
      // =====================================

      score += (listing.averageRating || 0) * 2;

      // =====================================
      // 6. Reviews
      // =====================================

      score += Math.min((listing.totalReviews || 0) / 20, 5);

      // =====================================
      // 7. Trending
      // =====================================

      score += Math.min((listing.trendingScore || 0) / 20, 5);

      // =====================================
      // PERSONALIZATION
      // =====================================

      if (userProfile) {
        // User liked this location before

        if (
          userProfile.locations?.some(
            (location) =>
              location.toLowerCase() === listing.city?.toLowerCase(),
          )
        ) {
          score += 5;
        }

        // User booked similar property before

        if (
          userProfile.propertyTypes?.some(
            (type) =>
              type.toLowerCase() === listing.propertyType?.toLowerCase(),
          )
        ) {
          score += 5;
        }

        // User liked similar amenities

        const userAmenities = userProfile.amenities || [];

        const listingAmenities = listing.amenities || [];

        const matchedUserAmenities = listingAmenities.filter((item) =>
          userAmenities.some(
            (userItem) => userItem.toLowerCase() === item.toLowerCase(),
          ),
        ).length;

        if (matchedUserAmenities) {
          score += Math.min(matchedUserAmenities, 5);
        }

        // Budget similarity

        if (userProfile.averageBudget && listing.currentPrice) {
          const diff = Math.abs(
            userProfile.averageBudget - listing.currentPrice,
          );

          if (diff < userProfile.averageBudget * 0.3) {
            score += 5;
          }
        }
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
