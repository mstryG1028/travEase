// src/services/recommendation.service.js

import api from "../api/axios"

class RecommendationService {
  async getRecommendations(question) {
    try {
      const { data } = await api.post("/recommendations", {
        question,
      });

      return data.data;
    } catch (error) {
      console.error("Recommendation Error:", error);

      throw (
        error.response?.data || {
          message: "Failed to get recommendations.",
        }
      );
    }
  }
}

export default new RecommendationService();
