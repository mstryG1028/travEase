class AIIntentService {
  detect(question) {
    const q = question.toLowerCase();

    if (
      q.includes("available") ||
      q.includes("availability") ||
      q.includes("book")
    ) {
      return {
        intent: "availability",
        confidence: 1,
        parameters: {},
      };
    }

    if (q.includes("price") || q.includes("cost") || q.includes("expensive")) {
      return {
        intent: "pricing",
        confidence: 1,
        parameters: {},
      };
    }

    if (
      q.includes("weather") ||
      q.includes("rain") ||
      q.includes("temperature")
    ) {
      return {
        intent: "weather",
        confidence: 1,
        parameters: {},
      };
    }

    if (
      q.includes("wifi") ||
      q.includes("pool") ||
      q.includes("parking") ||
      q.includes("amenities")
    ) {
      return {
        intent: "amenities",
        confidence: 1,
        parameters: {},
      };
    }

    if (q.includes("review") || q.includes("rating")) {
      return {
        intent: "reviews",
        confidence: 1,
        parameters: {},
      };
    }

    return {
      intent: "general",
      confidence: 1,
      parameters: {},
    };
  }
}

export default new AIIntentService();
