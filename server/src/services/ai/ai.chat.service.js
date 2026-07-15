import aiIntentService from "./ai.intent.service.js";
import aiContextService from "./ai.context.service.js";
import aiResponseService from "./ai.response.service.js";
import toolRegistry from "./ai.tool.registry.js";

class AIChatService {
  async chat(user, listingId, question) {
    console.log("Question:", question);

    // 1. Detect intent
    const intentResult = await aiIntentService.detect(question);
    console.log("Intent:", intentResult);

    const { intent, parameters = {}, confidence = 0 } = intentResult;

    // 2. Load listing context
    const context = await aiContextService.getListingContext(listingId);
    console.log("Context Loaded");

    // 3. Execute tool
    const tool = toolRegistry[intent];

    let toolData = null;

    if (tool) {
      console.log("Executing Tool:", intent);

      toolData = await tool.execute({
        user,
        listing: context.listing,
        context,
        parameters,
        question,
      });

      console.log("Tool Finished");
    }

    // 4. Generate AI response
    console.log("Calling Gemini");

    const answer = await aiResponseService.generate({
      user,
      question,
      listing: context,
      intent,
      confidence,
      parameters,
      toolData,
    });

    console.log("Gemini Finished");

    return {
      answer,
      intent,
      confidence,
      parameters,
      toolData,
    };
  }
}

export default new AIChatService();
