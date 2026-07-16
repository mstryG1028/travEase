class AIIntentService {
  detect(question) {
    const q = question.toLowerCase();

    // ===========================
    // Recommendation Intent
    // ===========================

    const recommendationKeywords = [
      "recommend",
      "suggest",
      "find",
      "search",
      "looking for",
      "looking",
      "need",
      "show me",
      "best",
      "cheap",
      "cheapest",
      "budget",
      "luxury",
      "villa",
      "hotel",
      "resort",
      "hostel",
      "homestay",
      "apartment",
      "cottage",
      "stay",
      "trip",
      "vacation",
      "holiday",
      "honeymoon",
      "family",
      "beach",
      "mountain",
      "pool",
    ];

    if (recommendationKeywords.some((word) => q.includes(word))) {
      return {
        intent: "recommendation",
        scope: "global",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Availability
    // ===========================

    if (
      q.includes("available") ||
      q.includes("availability") ||
      q.includes("book")
    ) {
      return {
        intent: "availability",
        scope: "listing",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Pricing
    // ===========================

    if (q.includes("price") || q.includes("cost") || q.includes("expensive")) {
      return {
        intent: "pricing",
        confidence: 1,
        scope: "listing",
        parameters: {},
      };
    }

    // ===========================
    // Weather
    // ===========================

    if (
      q.includes("weather") ||
      q.includes("rain") ||
      q.includes("temperature")
    ) {
      return {
        intent: "weather",
        confidence: 1,
        scope: "listing",
        parameters: {},
      };
    }

    // ===========================
    // Amenities
    // ===========================

    if (
      q.includes("wifi") ||
      q.includes("pool") ||
      q.includes("parking") ||
      q.includes("amenities")
    ) {
      return {
        intent: "amenities",
        confidence: 1,
        scope: "listing",
        parameters: {},
      };
    }

    // ===========================
    // Reviews
    // ===========================

    if (q.includes("review") || q.includes("rating")) {
      return {
        intent: "reviews",
        confidence: 1,
        scope: "listing",
        parameters: {},
      };
    }

    return {
      intent: "general",
      confidence: 1,
      scope: "listing",
      parameters: {},
    };
  }
}

export default new AIIntentService();
