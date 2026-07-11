import aiIntentService from "./ai.intent.service.js";
import aiContextService from "./ai.context.service.js";
import aiResponseService from "./ai.response.service.js";
import toolRegistry from "./ai.tool.registry.js";

class AIChatService {
  async chat(user, listingId, question) {
    // 1. Detect intent
    const intentResult = await aiIntentService.detect(question);

    const { intent, parameters = {}, confidence = 0 } = intentResult;

    // 2. Load listing context
    const listing = await aiContextService.getListingContext(listingId);

    // 3. Execute tool (if registered)
    const tool = toolRegistry[intent];

    let toolData = null;

    if (tool) {
      toolData = await tool.execute({
        user,
        listing,
        parameters,
        question,
      });
    }

    console.log("Question:", question);
console.log("Intent:", intent);
console.log("Parameters:", parameters);
console.log("Listing:", listing);
console.log("Tool:", toolData);
    // 4. Generate AI response
    const answer = await aiResponseService.generate({
      user,
      question,
      listing,
      intent,
      confidence,
      parameters,
      toolData,
    });

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
