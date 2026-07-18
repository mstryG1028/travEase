import * as aiService from "../services/ai/ai.service.js";
import aiChatService from "../services/ai/ai.chat.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

// ======================================================
// Generate AI Summary
// ======================================================

export const generateSummary = AsyncHandler(async (req, res) => {
  const data = await aiService.generateSummary(req.params.id);

  return sendResponse(res, 200, data);
});

// ======================================================
// Generate AI Review
// ======================================================

export const generateReview = AsyncHandler(async (req, res) => {
  const review = await aiService.generateReview(req.body);

  return sendResponse(res, 200, {
    review,
  });
});

// ======================================================
// Owner Suggestions
// ======================================================

export const ownerSuggestions = AsyncHandler(async (req, res) => {
  const data = await aiService.ownerSuggestions(req.params.id);

  return sendResponse(res, 200, data);
});

// ======================================================
// Generate Tags
// ======================================================

export const generateTags = AsyncHandler(async (req, res) => {
  const data = await aiService.generateTags(req.params.id);

  return sendResponse(res, 200, data);
});

// ======================================================
// AI Chat
// ======================================================

export const chatWithAI = AsyncHandler(async (req, res) => {
  try {
   
    const { listingId, question } = req.body;

    const response = await aiChatService.chat(
      req.user,
      listingId,
      question.trim(),
    );

    return sendResponse(
      res,
      200,
      response,
      "AI Response Generated Successfully",
    );
  } catch (err) {
    console.error("============== AI ERROR ==============");
  
    console.error(err.stack);

    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack, // remove after debugging
    });
  }
});
