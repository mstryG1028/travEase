import { Listing } from "../../models/index.js";

class SearchService {
  async search(filters) {
    const query = {
      status: "Active",
      isAvailable: true,
    };

    if (filters.location) {
      query.$or = [
        {
          city: {
            $regex: filters.location,
            $options: "i",
          },
        },
        {
          state: {
            $regex: filters.location,
            $options: "i",
          },
        },
        {
          country: {
            $regex: filters.location,
            $options: "i",
          },
        },
      ];
    }

    if (filters.propertyType) {
      query.propertyType = filters.propertyType;
    }

    if (filters.budget) {
      query.currentPrice = {
        $lte: filters.budget,
      };
    }

    if (filters.guests) {
      query.guests = {
        $gte: filters.guests,
      };
    }

    if (filters.amenities.length) {
      query.amenities = {
        $all: filters.amenities,
      };
    }

    let listings = await Listing.find(query)
      .populate("owner", "fullname avatar")
      .lean();

    if (filters.keywords.length) {
      listings = listings.filter((listing) => {
        const searchable = `
          ${listing.title}
          ${listing.description}
          ${listing.aiSummary}
          ${(listing.tags || []).join(" ")}
        `.toLowerCase();

        return filters.keywords.some((keyword) =>
          searchable.includes(keyword.toLowerCase()),
        );
      });
    }

    return listings;
  }
}

export default new SearchService();
