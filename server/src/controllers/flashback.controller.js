import * as flashbackService from "../services/flashback/flashback.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

// ===================================
// Create Flashback
// ===================================

export const createFlashback = AsyncHandler(async (req, res) => {
  const flashback = await flashbackService.createFlashback(
    req.body,

    req.files,

    req.user,
  );

  return sendResponse(
    res,

    201,

    flashback,

    "Flashback Added Successfully",
  );
});

// ===================================
// Listing Flashbacks
// ===================================

export const listingFlashbacks = AsyncHandler(async (req, res) => {
  const flashbacks = await flashbackService.listingFlashbacks(
    req.params.listingId,
  );

  return sendResponse(
    res,

    200,

    flashbacks,
  );
});

// ===================================
// My Flashbacks
// ===================================

export const myFlashbacks = AsyncHandler(async (req, res) => {
  const flashbacks = await flashbackService.myFlashbacks(req.user._id);

  return sendResponse(
    res,

    200,

    flashbacks,
  );
});

// ===================================
// Like / Unlike
// ===================================

export const likeFlashback = AsyncHandler(async (req, res) => {
  const flashback = await flashbackService.likeFlashback(
    req.params.id,

    req.user._id,
  );

  return sendResponse(
    res,

    200,

    flashback,

    "Updated",
  );
});

// ===================================
// Delete Flashback
// ===================================

export const deleteFlashback = AsyncHandler(async (req, res) => {
  await flashbackService.deleteFlashback(
    req.params.id,

    req.user._id,
  );

  return sendResponse(
    res,

    200,

    null,

    "Flashback Deleted",
  );
});
