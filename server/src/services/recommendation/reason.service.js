class ReasonService {
  generate(listing, filters) {
    const reasons = [];

    // ==========================
    // Location
    // ==========================

    if (filters.location) {
      const location = filters.location.toLowerCase();

      if (
        listing.city.toLowerCase().includes(location) ||
        listing.state.toLowerCase().includes(location) ||
        listing.country.toLowerCase().includes(location)
      ) {
        reasons.push(`located in ${listing.city}`);
      }
    }

    // ==========================
    // Property Type
    // ==========================

    if (
      filters.propertyType &&
      listing.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
    ) {
      reasons.push(
        `matches your preferred ${listing.propertyType.toLowerCase()}`,
      );
    }

    // ==========================
    // Budget
    // ==========================

    if (filters.budget) {
      if (listing.currentPrice <= filters.budget) {
        reasons.push("fits your budget");
      } else {
        const difference = listing.currentPrice - filters.budget;

        if (difference <= 1000) {
          reasons.push(`only ₹${difference} above your budget`);
        }
      }
    }

    // ==========================
    // Guests
    // ==========================

    if (filters.guests && listing.guests >= filters.guests) {
      reasons.push(`accommodates ${filters.guests} guests`);
    }

    // ==========================
    // Amenities
    // ==========================

    if (filters.amenities.length) {
      const matchedAmenities = listing.amenities.filter((amenity) =>
        filters.amenities.some(
          (item) => item.toLowerCase() === amenity.toLowerCase(),
        ),
      );

      if (matchedAmenities.length) {
        reasons.push(`includes ${matchedAmenities.join(", ")}`);
      }
    }

    // ==========================
    // Rating
    // ==========================

    if (listing.averageRating >= 4.7) {
      reasons.push("has exceptional guest ratings");
    } else if (listing.averageRating >= 4.3) {
      reasons.push("has excellent guest ratings");
    }

    // ==========================
    // Reviews
    // ==========================

    if (listing.totalReviews >= 50) {
      reasons.push(`trusted by ${listing.totalReviews}+ guests`);
    }

    // ==========================
    // Trending
    // ==========================

    if (listing.trendingScore >= 80) {
      reasons.push("currently trending");
    }

    // ==========================
    // Discount
    // ==========================

    if (
      listing.basePrice &&
      listing.currentPrice &&
      listing.basePrice > listing.currentPrice
    ) {
      const discount = Math.round(
        ((listing.basePrice - listing.currentPrice) / listing.basePrice) * 100,
      );

      if (discount >= 10) {
        reasons.push(`${discount}% discounted`);
      }
    }

    // ==========================
    // Availability
    // ==========================

    if (listing.isAvailable) {
      reasons.push("currently available");
    }

    // ==========================
    // Default
    // ==========================

    if (!reasons.length) {
      return "A good overall match based on your preferences.";
    }

    return reasons.join(", ");
  }
}

export default new ReasonService();
