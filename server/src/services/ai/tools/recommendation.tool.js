import recommendationService from "../../recommendation/recommendation.service.js";

class RecommendationTool {
  name = "recommendation";

  async execute({
    question,

    user,
  }) {
    return await recommendationService.getRecommendations({
      question,

      user,
    });
  }
}

export default new RecommendationTool();
