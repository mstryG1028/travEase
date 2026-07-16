import recommendationService from "../services/recommendation/recommendation.service.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import ApiError  from "../utils/ApiError.js";

class RecommendationController {
  async getRecommendations(req, res, next) {
    try {
      const { question } = req.body;

      if (!question?.trim()) {
        throw new ApiError(400, "Question is required.");
      }

      const recommendations = await recommendationService.getRecommendations({
        question,
        user: req.user,
      });

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            recommendations,
            "Recommendations fetched successfully.",
          ),
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new RecommendationController();
