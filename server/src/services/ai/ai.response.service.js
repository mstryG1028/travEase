import ai from "../../config/gemini.js";

class AIResponseService {
  async generate({ question, listing, intent, parameters, toolData }) {
    const prompt = `
You are TravEase AI, an intelligent travel assistant.

Your job is to answer ONLY using the provided data.

Do NOT make up information.

If the answer cannot be determined from the provided data,
politely say that the information is unavailable.

----------------------------
USER QUESTION
----------------------------

${question}

----------------------------
INTENT
----------------------------

${intent}

----------------------------
PARAMETERS
----------------------------

${JSON.stringify(parameters, null, 2)}

----------------------------
LISTING
----------------------------

${JSON.stringify(listing, null, 2)}

----------------------------
TOOL RESULT
----------------------------

${JSON.stringify(toolData, null, 2)}

----------------------------

Rules:

1. Answer naturally.
2. Keep answer below 100 words.
3. Don't mention JSON.
4. Don't mention "Tool Result".
5. Don't invent facts.
6. If weather/pricing/reviews are unavailable, clearly state that.

`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return result.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
}

export default new AIResponseService();
