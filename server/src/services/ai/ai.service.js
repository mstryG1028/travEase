import { ListingAI, ListingAnalytics } from "../../models/index.js";
import listingRepository from "../../repositories/listing.repository.js";
import ApiError from "../../utils/ApiError.js";

// ======================================
// Generate Listing Summary
// ======================================

export async function generateSummary(listingId) {
  const listing = await listingRepository.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  const summary = `Enjoy your stay at ${listing.title} located in ${listing.city}. This ${listing.propertyType} offers ${listing.bedrooms} bedroom(s), ${listing.bathrooms} bathroom(s), accommodates ${listing.maxGuests} guest(s), and includes amenities like ${listing.amenities?.slice(0, 5).join(", ")}. Perfect for a comfortable and memorable trip.`;

  let ai = await ListingAI.findOne({
    listing: listingId,
  });

  if (!ai) {
    ai = await ListingAI.create({
      listing: listingId,
    });
  }

  ai.summary = summary;

  await ai.save();

  return ai;
}

// ======================================
// AI Review
// ======================================

export async function generateReview(data) {
  const rating = Number(data.rating);

  if (rating >= 5)
    return "Amazing stay! Clean rooms, excellent location and highly recommended.";

  if (rating >= 4)
    return "Very good experience with comfortable stay and friendly host.";

  if (rating >= 3) return "Average stay with a few areas that can be improved.";

  if (rating >= 2)
    return "Below average experience. Several improvements are needed.";

  return "Poor experience. The property requires significant improvement.";
}

// ======================================
// Owner Suggestions
// ======================================

export async function ownerSuggestions(listingId) {
  const analytics = await ListingAnalytics.findOne({
    listing: listingId,
  });

  if (!analytics) {
    throw new ApiError(404, "Analytics not found");
  }

  const suggestions = [];

  if (analytics.totalBookings < 5) {
    suggestions.push("Reduce the price by 10% to attract more bookings.");
  }

  if (analytics.averageRating < 4) {
    suggestions.push("Improve cleanliness and guest experience.");
  }

  if (analytics.totalViews > 100 && analytics.totalBookings < 5) {
    suggestions.push(
      "Many visitors are viewing this listing but not booking. Update photos and description.",
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your listing is performing well. Keep maintaining quality.",
    );
  }

  return suggestions;
}

// ======================================
// AI Search Tags
// ======================================

export async function generateTags(listingId) {
  const listing = await listingRepository.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  const tags = [];

  tags.push(listing.city);
  tags.push(listing.country);
  tags.push(listing.propertyType);

  listing.amenities?.forEach((item) => tags.push(item));

  let ai = await ListingAI.findOne({
    listing: listingId,
  });

  ai.tags = [...new Set(tags)];

  await ai.save();

  return ai.tags;
}
