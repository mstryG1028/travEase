import aiIntentService from "./ai.intent.service.js";
import aiContextService from "./ai.context.service.js";
import aiResponseService from "./ai.response.service.js";
import toolRegistry from "./ai.tool.registry.js";

class AIChatService {
  async chat(user, listingId, question) {
    console.log("Question:", question);

    // ===========================
    // Detect Intent
    // ===========================

    const intentResult = await aiIntentService.detect(question);

    const {
      intent,
      scope = "listing",
      parameters = {},
      confidence = 0,
    } = intentResult;

    console.log("Intent:", intent);

    // ===========================
    // Listing Context
    // ===========================

    let context = null;

    if (scope === "listing") {
      context = await aiContextService.getListingContext(listingId);
    }
    // ===========================
    // Tool
    // ===========================

    let toolData = null;

    const tool = toolRegistry[intent];

    if (tool) {
      toolData = await tool.execute({
        user,
        listing: context?.listing || null,
        context,
        parameters,
        question,
      });
    }

    // ===================================
    // Recommendation Response
    // ===================================

    if (intent === "recommendation") {
      return {
        type: "recommendation",
        recommendations: toolData.recommendations,
        filters: toolData.filters,
      };
    }

    // ===================================
    // Normal AI Response
    // ===================================

    const answer = await aiResponseService.generate({
      user,
      question,
      listing: context,
      intent,
      confidence,
      parameters,
      toolData,
    });

    return {
      type: "text",
      answer,
      intent,
      confidence,
      parameters,
      toolData,
    };
  }
}

export default new AIChatService();
