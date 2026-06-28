import * as aiService from "../services/ai/ai.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const generateSummary = AsyncHandler(async (req, res) => {
  const data = await aiService.generateSummary(req.params.id);

  return sendResponse(res, 200, data);
});

export const generateReview = AsyncHandler(async (req, res) => {
  const review = await aiService.generateReview(req.body);

  return sendResponse(res, 200, {
    review,
  });
});

export const ownerSuggestions = AsyncHandler(async (req, res) => {
  const data = await aiService.ownerSuggestions(req.params.id);

  return sendResponse(res, 200, data);
});

export const generateTags = AsyncHandler(async (req, res) => {
  const data = await aiService.generateTags(req.params.id);

  return sendResponse(res, 200, data);
});
