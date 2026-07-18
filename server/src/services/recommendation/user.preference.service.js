import { SearchHistory } from "./models/searchHistory.model.js";
import { Favorite, Booking, Review } from "../../models/index.js";

class UserPreferenceService {
  async getUserPreferences(userId) {
    if (!userId) {
      return {
        locations: [],
        propertyTypes: [],
        amenities: [],
      };
    }

    // 1. Search history

    const history = await SearchHistory.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .lean();

    // 2. Wishlist

    const favorites = await Favorite.find({
      user: userId,
    })
      .populate("listing")
      .lean();

    // 3. Previous bookings

    const bookings = await Booking.find({
      guest: userId,
      bookingStatus: {
        $in: ["Confirmed", "Completed"],
      },
    })
      .populate("listing")
      .lean();

    // 4. Reviews given

    const reviews = await Review.find({
      user: userId,
    })
      .populate("listing")
      .lean();

    const locations = [];
    const propertyTypes = [];
    const amenities = [];

    // From searches

    history.forEach((item) => {
      if (item.filters?.location) {
        locations.push(item.filters.location);
      }

      if (item.filters?.propertyType) {
        propertyTypes.push(item.filters.propertyType);
      }

      if (item.filters?.amenities) {
        amenities.push(...item.filters.amenities);
      }
    });

    // From wishlist

    favorites.forEach((item) => {
      const listing = item.listing;

      if (!listing) return;

      locations.push(listing.city);

      propertyTypes.push(listing.propertyType);

      amenities.push(...listing.amenities);
    });

    // From bookings

    bookings.forEach((item) => {
      const listing = item.listing;

      if (!listing) return;

      locations.push(listing.city);

      propertyTypes.push(listing.propertyType);

      amenities.push(...listing.amenities);
    });

    return {
      locations: [...new Set(locations)],

      propertyTypes: [...new Set(propertyTypes)],

      amenities: [...new Set(amenities)],
    };
  }
}

export default new UserPreferenceService();
