import * as aiService from "../services/ai/ai.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import aiChatService from "../services/ai/ai.chat.service.js";

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

export const chatWithAI = AsyncHandler(async (req, res) => {
  try {
    console.log("========== AI REQUEST ==========");
    console.log("Body:", req.body);
    console.log("User:", req.user);

    const { listingId, question } = req.body;

    const response = await aiChatService.chat(
      req.user,
      listingId,
      question
    );

    return sendResponse(res, 200, response, "AI Response");
  } catch (err) {
    console.error("AI CHAT ERROR");
    console.error(err);
    console.error(err.stack);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
