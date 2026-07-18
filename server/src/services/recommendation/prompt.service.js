import ai, { GEMINI_MODEL } from "../../config/gemini.js";
class PromptService {
  async extractFilters(question) {
    const prompt = `
You are an AI travel assistant.

Convert the user's request into JSON.

Return ONLY JSON.

Schema:

{
  "location":"",
  "propertyType":"",
  "budget":null,
  "guests":null,
  "amenities":[],
  "keywords":[],
  "sortPreference":"",
  "tripType":"",
  "travelPurpose":"",
  "checkIn":"",
  "checkOut":""
}

Rules

budget -> number

guests -> number

keywords -> array

amenities -> array

Allowed sortPreference

price

rating

popular

reviews

trending

Do not explain.

Question:

${question}
`;

    try {
      const result = await ai.models.generateContent({
         model: GEMINI_MODEL,
        contents: prompt,
      });

      let response = result.text;

      response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(response);
    } catch (error) {
      console.error(error);

      return {
        location: "",
        propertyType: "",
        budget: null,
        guests: null,
        amenities: [],
        keywords: [],
        tripType: "",
        travelPurpose: "",
        petFriendly: false,
        nearAirport: false,
        nearBeach: false,
        luxury: false,
      };
    }
  }
}

export default new PromptService();
