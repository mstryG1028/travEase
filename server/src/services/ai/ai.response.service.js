import ai from "../../config/gemini.js";

class AIResponseService {
  async generate({ question, listing, intent, parameters, toolData }) {
    const prompt = `
You are TravEase AI.

You are a helpful travel assistant.

Answer ONLY using the provided listing and tool result.

If information is unavailable, politely say so.

Question:
${question}

Intent:
${intent}

Parameters:
${JSON.stringify(parameters)}

Listing:
${JSON.stringify(listing)}

Tool Result:
${JSON.stringify(toolData)}

Answer naturally in under 120 words.
`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log("Gemini Response:", result);

      return result.text;
    } catch (err) {
      console.error("Gemini Error:", err);
      throw err;
    }
  }
}

export default new AIResponseService();
