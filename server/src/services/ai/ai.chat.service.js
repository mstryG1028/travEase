import aiIntentService from "./ai.intent.service.js";
import aiResponseService from "./ai.response.service.js";
import toolRegistry from "./ai.tool.registry.js";

class AIChatService {
  async chat(user, listingId, question) {
    console.log("\n========== AI CHAT ==========");
    console.log("Question:", question);

    // 1. Detect intent
    const intentResult = await aiIntentService.detect(question);

    const {
      intent = "general",
      scope = "listing",
      confidence = 0.5,
      parameters = {},
    } = intentResult;

    console.log("Intent:", intent);

    // 2. Find tool
    const tool = toolRegistry[intent];

    let toolResult = null;

    if (tool) {
      try {
        toolResult = await tool.execute({
          user,
          listingId,
          question,
          parameters,
        });
      } catch (err) {
        console.error(`Tool Error (${intent})`, err);

        toolResult = {
          success: false,
          error: err.message,
        };
      }
    }

    // 3. Recommendation response
    if (intent === "recommendation") {
      return {
        type: "recommendation",
        recommendations: toolResult?.recommendations || [],
        filters: toolResult?.filters || {},
      };
    }

    // 4. Generate natural language response
    const answer = await aiResponseService.generate({
      question,
      intent,
      parameters,
      toolData: toolResult,
    });

    return {
      type: "text",
      answer,
      intent,
      confidence,
      parameters,
      toolData: toolResult,
    };
  }
}

export default new AIChatService();
