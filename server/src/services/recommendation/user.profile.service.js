import {
  Favorite,
  Booking,
  Review,
  SearchHistory,
} from "../../models/index.js";

class UserProfileService {
  async getUserProfile(userId) {
    // If user is not logged in
    // return empty profile

    if (!userId) {
      return this.emptyProfile();
    }

    try {
      const [favorites, bookings, reviews, searches] = await Promise.all([
        Favorite.find({
          user: userId,
        })
          .populate("listing")
          .lean(),

        Booking.find({
          guest: userId,
        })
          .populate("listing")
          .lean(),

        Review.find({
          user: userId,
        })
          .populate("listing")
          .lean(),

        SearchHistory.find({
          user: userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(20)
          .lean(),
      ]);

      const profile = {
        locations: [],

        propertyTypes: [],

        amenities: [],

        keywords: [],

        budgets: [],
      };

      // =====================================
      // Wishlist Analysis
      // =====================================

      favorites.forEach((item) => {
        this.addListingPreference(
          item.listing,

          profile,
        );
      });

      // =====================================
      // Booking Analysis
      // =====================================

      bookings.forEach((item) => {
        this.addListingPreference(
          item.listing,

          profile,
        );
      });

      // =====================================
      // Review Analysis
      // =====================================

      reviews.forEach((review) => {
        // Only consider good experiences

        if (review.rating >= 4) {
          this.addListingPreference(
            review.listing,

            profile,
          );
        }
      });

      // =====================================
      // Search History Analysis
      // =====================================

      searches.forEach((search) => {
        const filters = search.filters;

        if (!filters) return;

        if (filters.location) {
          profile.locations.push(filters.location);
        }

        if (filters.propertyType) {
          profile.propertyTypes.push(filters.propertyType);
        }

        if (filters.amenities) {
          profile.amenities.push(...filters.amenities);
        }

        if (filters.keywords) {
          profile.keywords.push(...filters.keywords);
        }

        if (filters.budget) {
          profile.budgets.push(filters.budget);
        }
      });

      return {
        locations: this.unique(profile.locations),

        propertyTypes: this.unique(profile.propertyTypes),

        amenities: this.unique(profile.amenities),

        keywords: this.unique(profile.keywords),

        averageBudget: this.average(profile.budgets),
      };
    } catch (error) {
      console.error("USER PROFILE ERROR", error);

      return this.emptyProfile();
    }
  }

  addListingPreference(listing, profile) {
    if (!listing) return;

    if (listing.city) {
      profile.locations.push(listing.city);
    }

    if (listing.propertyType) {
      profile.propertyTypes.push(listing.propertyType);
    }

    if (listing.amenities) {
      profile.amenities.push(...listing.amenities);
    }

    if (listing.currentPrice) {
      profile.budgets.push(listing.currentPrice);
    }
  }

  unique(array) {
    return [...new Set(array.filter(Boolean))];
  }

  average(numbers) {
    if (!numbers.length) return 0;

    return Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
  }

  emptyProfile() {
    return {
      locations: [],

      propertyTypes: [],

      amenities: [],

      keywords: [],

      averageBudget: 0,
    };
  }
}

export default new UserProfileService();
