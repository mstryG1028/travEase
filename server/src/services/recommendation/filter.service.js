class FilterService {
  constructor() {
    this.propertyTypes = [
      "hotel",
      "villa",
      "resort",
      "apartment",
      "hostel",
      "homestay",
      "cottage",
    ];

    this.amenityKeywords = [
      "wifi",
      "pool",
      "parking",
      "garden",
      "gym",
      "kitchen",
      "breakfast",
      "fireplace",
      "balcony",
      "restaurant",
      "bonfire",
      "beach access",
      "airport pickup",
      "air conditioning",
    ];

    this.tripKeywords = {
      honeymoon: "Honeymoon",
      romantic: "Romantic",
      family: "Family",
      business: "Business",
      work: "Business",
      vacation: "Vacation",
      holiday: "Vacation",
      solo: "Solo",
      friends: "Friends",
      adventure: "Adventure",
    };
  }

  extract(question) {
    const text = question.toLowerCase();

    const filters = {
      location: "",
      propertyType: "",
      budget: null,
      guests: null,
      amenities: [],
      keywords: [],
      sortPreference: "",
      tripType: "",
      travelPurpose: "",
      checkIn: "",
      checkOut: "",
      luxury: false,
      nearAirport: false,
      nearBeach: false,
      petFriendly: false,
    };

    // -----------------------
    // Budget
    // -----------------------

    const budgetMatch =
      text.match(/under\s*₹?\s*(\d+)/i) ||
      text.match(/below\s*₹?\s*(\d+)/i) ||
      text.match(/budget\s*₹?\s*(\d+)/i) ||
      text.match(/₹\s*(\d+)/i);

    if (budgetMatch) {
      filters.budget = Number(budgetMatch[1]);
    }

    // -----------------------
    // Guests
    // -----------------------

    const guestMatch =
      text.match(/for\s*(\d+)\s*(guest|guests|people|person)/i) ||
      text.match(/(\d+)\s*(guest|guests|people|person)/i);

    if (guestMatch) {
      filters.guests = Number(guestMatch[1]);
    }

    // -----------------------
    // Property Type
    // -----------------------

    for (const type of this.propertyTypes) {
      if (text.includes(type)) {
        filters.propertyType = type.charAt(0).toUpperCase() + type.slice(1);
        break;
      }
    }

    // -----------------------
    // Amenities
    // -----------------------

    filters.amenities = this.amenityKeywords.filter((item) =>
      text.includes(item.toLowerCase()),
    );

    // -----------------------
    // Trip Type
    // -----------------------

    for (const key of Object.keys(this.tripKeywords)) {
      if (text.includes(key)) {
        filters.tripType = this.tripKeywords[key];
        filters.travelPurpose = this.tripKeywords[key];
        break;
      }
    }

    // -----------------------
    // Boolean Flags
    // -----------------------

    filters.nearBeach = text.includes("beach") || text.includes("sea");

    filters.nearAirport = text.includes("airport");

    filters.petFriendly = text.includes("pet");

    filters.luxury = text.includes("luxury") || text.includes("premium");

    return filters;
  }
}

export default new FilterService();
