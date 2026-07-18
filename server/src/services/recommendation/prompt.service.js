import ai, { GEMINI_MODEL } from "../../config/gemini.js";

class PromptService {
  extractWithRules(question) {
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
    };

    // -----------------------
    // Budget
    // -----------------------

    const budgetMatch =
      text.match(/under\s*₹?\s*(\d+)/i) ||
      text.match(/below\s*₹?\s*(\d+)/i) ||
      text.match(/less than\s*₹?\s*(\d+)/i) ||
      text.match(/budget\s*₹?\s*(\d+)/i);

    if (budgetMatch) {
      filters.budget = Number(budgetMatch[1]);
    }

    // -----------------------
    // Guests
    // -----------------------

    const guestMatch =
      text.match(/(\d+)\s*guests?/i) || text.match(/for\s*(\d+)/i);

    if (guestMatch) {
      filters.guests = Number(guestMatch[1]);
    }

    // -----------------------
    // Property Type
    // -----------------------

    const propertyTypes = [
      "hotel",
      "villa",
      "resort",
      "hostel",
      "apartment",
      "homestay",
      "cottage",
    ];

    for (const type of propertyTypes) {
      if (text.includes(type)) {
        filters.propertyType = type.charAt(0).toUpperCase() + type.slice(1);
      }
    }

    // -----------------------
    // Sort
    // -----------------------

    if (text.includes("cheapest")) filters.sortPreference = "price";

    if (text.includes("best rated")) filters.sortPreference = "rating";

    if (text.includes("popular")) filters.sortPreference = "popular";

    // -----------------------
    // Amenities
    // -----------------------

    const amenities = [
      "wifi",
      "parking",
      "pool",
      "garden",
      "breakfast",
      "ac",
      "restaurant",
      "balcony",
      "bonfire",
      "fireplace",
      "air conditioning",
      "private pool",
      "beach access",
      "river view",
      "lake view",
      "hill view",
      "forest view",
    ];

    filters.amenities = amenities.filter((a) => text.includes(a.toLowerCase()));

    // -----------------------
    // Location
    // -----------------------

    const cities = [
      "goa",
      "manali",
      "shimla",
      "coorg",
      "rishikesh",
      "udaipur",
      "jaipur",
      "kerala",
      "wayanad",
      "ooty",
      "nainital",
      "mussoorie",
      "lakshadweep",
      "darjeeling",
      "mumbai",
      "delhi",
      "pune",
    ];

    for (const city of cities) {
      if (text.includes(city)) {
        filters.location = city;
      }
    }

    // -----------------------
    // Keywords
    // -----------------------

    filters.keywords = text
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 2 &&
          !cities.includes(word) &&
          !propertyTypes.includes(word),
      );

    return filters;
  }

  needsGemini(filters) {
    return (
      !filters.location &&
      !filters.propertyType &&
      !filters.budget &&
      !filters.guests &&
      filters.amenities.length === 0
    );
  }

  async extractFilters(question) {
    const ruleFilters = this.extractWithRules(question);

    console.log("Rule Filters:");
    console.log(ruleFilters);

    if (!this.needsGemini(ruleFilters)) {
      return ruleFilters;
    }

    console.log("Using Gemini fallback...");

    const prompt = `
Return ONLY JSON.

{
"location":"",
"propertyType":"",
"budget":null,
"guests":null,
"amenities":[],
"keywords":[],
"sortPreference":"",
"tripType":"",
"travelPurpose":"",
"checkIn":"",
"checkOut":""
}

Question:
${question}
`;

    try {
      const result = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      let response = result.text;

      response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const geminiFilters = JSON.parse(response);

      return {
        ...ruleFilters,
        ...geminiFilters,
      };
    } catch (err) {
      console.log("Gemini failed. Using rule filters.");

      return ruleFilters;
    }
  }
}

export default new PromptService();
