import ai from "../../config/gemini.js";

const VALID_INTENTS = [
  "weather",
  "pricing",
  "reviews",
  "amenities",
  "availability",
  "location",
  "general",
];

class AIIntentService {
  async detect(question) {
    const today = new Date().toISOString().split("T")[0];

    const prompt = `
You are an AI intent extractor for a hotel booking website.

Today's date is ${today}.

Return ONLY valid JSON.

The JSON format must be:

{
  "intent":"availability",
  "parameters":{
      "checkIn":"2026-08-15",
      "checkOut":"2026-08-18",
      "days":15,
      "guests":2
  }
}

Available intents:

weather
pricing
reviews
amenities
availability
location
general

Rules:

1. Return ONLY JSON.
2. Never explain anything.
3. Never wrap JSON inside markdown.
4. If user asks:
   "Can I book on 15 August?"
   →
   {
      "intent":"availability",
      "parameters":{
         "checkIn":"2026-08-15"
      }
   }

5. If user asks:
   "Can I book from 15 August to 18 August?"
   →
   {
      "intent":"availability",
      "parameters":{
          "checkIn":"2026-08-15",
          "checkOut":"2026-08-18"
      }
   }

6. If user asks:
   "Show available dates for next 15 days"
   →
   {
      "intent":"availability",
      "parameters":{
          "days":15
      }
   }

7. If user asks:
   "Show available dates for next month"
   →
   {
      "intent":"availability",
      "parameters":{
          "days":30
      }
   }

8. If user asks:
   "Can 5 guests stay?"
   →
   {
      "intent":"amenities",
      "parameters":{
          "guests":5
      }
   }

9. Never invent values.

10. If no parameters exist

{
  "intent":"general",
  "parameters":{}
}

Question:

"${question}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text =
      typeof response.text === "function" ? response.text() : response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const result = JSON.parse(text);

      return {
        intent: VALID_INTENTS.includes(result.intent)
          ? result.intent
          : "general",

        parameters: result.parameters || {},
      };
    } catch (error) {
      console.log("Intent Parse Error:", text);

      return {
        intent: "general",
        parameters: {},
      };
    }
  }
}

export default new AIIntentService();
