import * as reviewService from "../services/review/review.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const createReview = AsyncHandler(async (req, res) => {
  const review = await reviewService.createReview(
    req.body,

    req.user,
  );

  return sendResponse(
    res,

    201,

    review,

    "Review Added",
  );
});

export const getReviews = AsyncHandler(async (req, res) => {
  const reviews = await reviewService.getListingReviews(req.params.id);

  return sendResponse(
    res,

    200,

    reviews,
  );
});

export const deleteReview = AsyncHandler(async (req, res) => {
  await reviewService.deleteReview(
    req.params.id,

    req.user._id,
  );

  return sendResponse(
    res,

    200,

    null,

    "Review Deleted",
  );
});
