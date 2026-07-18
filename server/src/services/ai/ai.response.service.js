import ai, { GEMINI_MODEL } from "../../config/gemini.js";

class AIResponseService {
  async generate({ question, intent, parameters, toolData }) {
    console.log("========== AI RESPONSE ==========");
    console.log("Intent:", intent);
    console.log("Tool Data:", JSON.stringify(toolData, null, 2));

    // If tool already has a proper response, return it directly
    if (toolData?.success && toolData?.message) {
      return toolData.message;
    }

    if (toolData?.error) {
      return toolData.error;
    }
    const prompt = `
You are TravEase AI.

User Question:
${question}

Intent:
${intent}

Available Data:
${JSON.stringify(toolData, null, 2)}

Generate a short and helpful response for the user.
Do not mention that you are using tools.
`;

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      return response.text;
    } catch (err) {
      console.error("Gemini Error:", err.message);

      // Fallback when Gemini fails

      if (toolData?.success) {
        switch (intent) {
          case "weather":
            return (
              toolData.message ||
              "Weather information is currently unavailable."
            );

          case "amenities":
            return (
              toolData.message ||
              "Amenities information is currently unavailable."
            );

          case "reviews":
            return (
              toolData.message || "Review information is currently unavailable."
            );

          case "pricing":
            return (
              toolData.message ||
              "Pricing information is currently unavailable."
            );

          case "availability":
            return (
              toolData.message ||
              "Availability information is currently unavailable."
            );

          default:
            return toolData.message || "Information retrieved successfully.";
        }
      }

      if (toolData?.error) {
        return toolData.error;
      }

      return "AI service is temporarily unavailable. Please try again later.";
    }
  }
}

export default new AIResponseService();
