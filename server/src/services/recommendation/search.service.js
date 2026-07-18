import { Listing } from "../../models/index.js";

class SearchService {
  async search(filters) {
    const query = {
      status: "Active",
      isAvailable: true,
    };

    // -----------------------
    // Location
    // -----------------------

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

    // -----------------------
    // Property Type
    // -----------------------

    if (filters.propertyType) {
      query.propertyType = filters.propertyType;
    }

    let listings = await Listing.find(query)
      .populate("owner", "fullName avatar")
      .lean();

    // -----------------------
    // Keyword Search
    // -----------------------

    if (filters.keywords?.length) {
      listings = listings.filter((listing) => {
        const text = `
          ${listing.title}
          ${listing.description}
          ${listing.aiSummary}
          ${(listing.tags || []).join(" ")}
        `.toLowerCase();

        return filters.keywords.some((keyword) =>
          text.includes(keyword.toLowerCase()),
        );
      });
    }

    console.log("Listings Found:", listings.length);

    return listings;
  }
}

export default new SearchService();
