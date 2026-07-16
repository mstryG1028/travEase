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
  console.log("\n========== AI REQUEST ==========");
  console.log("User:", req.user?._id);
  console.log("Listing:", req.body.listingId);
  console.log("Question:", req.body.question);

  const { listingId, question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({
      success: false,
      message: "Question is required.",
    });
  }

  const response = await aiChatService.chat(
    req.user,
    listingId,
    question.trim(),
  );

  console.log("========== AI RESPONSE ==========");
  console.log("Response Type:", response.type);

  if (response.type === "recommendation") {
    console.log("Recommendations:", response.recommendations.length);
  }

  return sendResponse(res, 200, response, "AI Response Generated Successfully");
});
