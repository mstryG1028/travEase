import aiIntentService from "./ai.intent.service.js";
import aiContextService from "./ai.context.service.js";
import aiResponseService from "./ai.response.service.js";
import toolRegistry from "./ai.tool.registry.js";

class AIChatService {
  async chat(user, listingId, question) {
    // 1. Detect intent + parameters
    const { intent, parameters } = await aiIntentService.detect(question);

    // 2. Get listing context
    const listing = await aiContextService.getListingContext(listingId);

    // 3. Execute tool if available
    let toolData = null;

    if (toolRegistry[intent]) {
      toolData = await toolRegistry[intent].execute(listing, parameters);
    }

    // 4. Generate final AI response
    const answer = await aiResponseService.generate({
      question,
      listing,
      intent,
      parameters,
      toolData,
    });

    // 5. Return response
    return {
      intent,
      parameters,
      listing,
      toolData,
      answer,
    };
  }
}

export default new AIChatService();
