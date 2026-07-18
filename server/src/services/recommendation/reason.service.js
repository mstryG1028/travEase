class ReasonService {
  generate(listing, filters, userProfile = {}) {
    const reasons = [];

    // =====================================
    // Current Search Match
    // =====================================

    if (
      filters.location &&
      listing.city?.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      reasons.push(`located in ${listing.city}`);
    }

    if (
      filters.propertyType &&
      listing.propertyType?.toLowerCase() === filters.propertyType.toLowerCase()
    ) {
      reasons.push(`matches your preferred ${listing.propertyType}`);
    }

    if (filters.budget && listing.currentPrice <= filters.budget) {
      reasons.push("fits your budget");
    }

    if (filters.guests && listing.guests >= filters.guests) {
      reasons.push(`accommodates ${filters.guests} guests`);
    }

    // =====================================
    // Rating
    // =====================================

    if (listing.averageRating >= 4.5) {
      reasons.push("has excellent ratings");
    }

    // =====================================
    // Search Amenities Match
    // =====================================

    const matchedAmenities = (listing.amenities || []).filter((item) =>
      (filters.amenities || []).some(
        (a) => a.toLowerCase() === item.toLowerCase(),
      ),
    );

    if (matchedAmenities.length) {
      reasons.push(`includes ${matchedAmenities.join(", ")}`);
    }

    // =====================================
    // PERSONALIZATION REASONS
    // =====================================

    if (userProfile) {
      // Previous location interest

      if (
        userProfile.locations?.some(
          (location) => location.toLowerCase() === listing.city?.toLowerCase(),
        )
      ) {
        reasons.push("matches places you explored before");
      }

      // Previous property preference

      if (
        userProfile.propertyTypes?.some(
          (type) => type.toLowerCase() === listing.propertyType?.toLowerCase(),
        )
      ) {
        reasons.push("matches your previous stay preferences");
      }

      // Previous amenities

      const likedAmenities = (listing.amenities || []).filter((item) =>
        (userProfile.amenities || []).some(
          (userAmenity) => userAmenity.toLowerCase() === item.toLowerCase(),
        ),
      );

      if (likedAmenities.length) {
        reasons.push(
          `has amenities you liked before: ${likedAmenities.join(", ")}`,
        );
      }

      // Budget preference

      if (userProfile.averageBudget && listing.currentPrice) {
        const difference = Math.abs(
          userProfile.averageBudget - listing.currentPrice,
        );

        if (difference < userProfile.averageBudget * 0.25) {
          reasons.push("matches your usual travel budget");
        }
      }
    }

    if (!reasons.length) {
      return "A good overall match based on your requirements.";
    }

    return reasons.join(", ");
  }
}

export default new ReasonService();
