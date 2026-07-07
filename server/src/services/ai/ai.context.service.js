import { Listing } from "../../models/Listing.model.js";

class AIContextService {
  async getListingContext(listingId) {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      throw new Error("Listing not found");
    }

    return {
      id: listing._id,

      title: listing.title,

      description: listing.description,

      propertyType: listing.propertyType,

      city: listing.city,

      state: listing.state,

      country: listing.country,

      currentPrice: listing.currentPrice,

      averageRating: listing.averageRating,

      totalReviews: listing.totalReviews,

      amenities: listing.amenities,

      guests: listing.guests,

      bedrooms: listing.bedrooms,

      beds: listing.beds,

      bathrooms: listing.bathrooms,

      weather: listing.weather,
    };
  }
}

export default new AIContextService();
