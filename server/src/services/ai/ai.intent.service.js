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
      "show me",
      "best",
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
      q.includes("availability") ||
      q.includes("available dates") ||
      q.includes("booked") ||
      q.includes("booking") ||
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

    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("expensive") ||
      q.includes("cheap") ||
      q.includes("rate")
    ) {
      return {
        intent: "pricing",
        scope: "listing",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Weather
    // ===========================

    if (
      q.includes("weather") ||
      q.includes("temperature") ||
      q.includes("climate") ||
      q.includes("rain") ||
      q.includes("forecast") ||
      q.includes("sunny") ||
      q.includes("cold") ||
      q.includes("hot")
    ) {
      return {
        intent: "weather",
        scope: "listing",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Amenities
    // ===========================

    if (
      q.includes("amenities") ||
      q.includes("facility") ||
      q.includes("facilities") ||
      q.includes("wifi") ||
      q.includes("parking") ||
      q.includes("pool") ||
      q.includes("gym") ||
      q.includes("kitchen")
    ) {
      return {
        intent: "amenities",
        scope: "listing",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Reviews
    // ===========================

    if (
      q.includes("review") ||
      q.includes("reviews") ||
      q.includes("rating") ||
      q.includes("guest") ||
      q.includes("guests") ||
      q.includes("feedback") ||
      q.includes("experience") ||
      q.includes("people say")
    ) {
      return {
        intent: "reviews",
        scope: "listing",
        confidence: 1,
        parameters: {},
      };
    }

    // ===========================
    // Default fallback
    // ===========================

    return {
      intent: "general",
      scope: "listing",
      confidence: 0,
      parameters: {},
    };
  }
}

export default new AIIntentService();
