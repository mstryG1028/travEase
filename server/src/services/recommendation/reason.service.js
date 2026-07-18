class ReasonService {
  generate(listing, filters) {
    const reasons = [];

    // Property type
    if (
      filters.propertyType &&
      listing.propertyType?.toLowerCase() === filters.propertyType.toLowerCase()
    ) {
      reasons.push(`matches your preferred ${listing.propertyType}`);
    }

    // Location
    if (
      filters.location &&
      listing.city?.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      reasons.push(`located in ${listing.city}`);
    }

    // Budget
    if (filters.budget && listing.currentPrice <= filters.budget) {
      reasons.push("fits your budget");
    }

    // Guests
    if (filters.guests && listing.guests >= filters.guests) {
      reasons.push(`accommodates ${filters.guests} guests`);
    }

    // Rating
    if (listing.averageRating >= 4.5) {
      reasons.push("has excellent ratings");
    }

    // Amenities
    const matchedAmenities = (listing.amenities || []).filter((amenity) =>
      (filters.amenities || []).some(
        (item) => item.toLowerCase() === amenity.toLowerCase(),
      ),
    );

    if (matchedAmenities.length) {
      reasons.push(`includes ${matchedAmenities.join(", ")}`);
    }

    if (!reasons.length) {
      return "A good overall match for your requirements.";
    }

    return reasons.join(", ");
  }
}

export default new ReasonService();
