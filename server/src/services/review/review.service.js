import reviewRepository from "../../repositories/review.repository.js";

import { Booking, ListingAnalytics } from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";

export async function createReview(data, user) {
  const booking = await Booking.findById(data.booking);

  if (!booking) {
    throw new ApiError(
      404,

      "Booking not found",
    );
  }

  if (booking.guest.toString() !== user._id.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  if (booking.bookingStatus !== "Completed") {
    throw new ApiError(
      400,

      "Review allowed only after completed booking",
    );
  }

  const exists = await reviewRepository.findOne({
    booking: data.booking,
  });

  if (exists) {
    throw new ApiError(
      400,

      "Review already exists",
    );
  }

  const review = await reviewRepository.create({
    booking: data.booking,

    listing: booking.listing,

    user: user._id,

    rating: data.rating,

    comment: data.comment,
  });

  // ======================
  // Update Analytics
  // ======================

  const analytics = await ListingAnalytics.findOne({
    listing: booking.listing,
  });

  const reviews = await reviewRepository.find({
    listing: booking.listing,
  });

  analytics.reviewCount = reviews.length;

  analytics.averageRating =
    reviews.reduce(
      (sum, r) => sum + r.rating,

      0,
    ) / reviews.length;

  await analytics.save();

  return review;
}

// ====================

export async function getListingReviews(listingId) {
  return await reviewRepository.find({
    listing: listingId,
  });
}

export async function deleteReview(
  reviewId,

  userId,
) {
  const review = await reviewRepository.findOne({
    _id: reviewId,
  });

  if (!review) {
    throw new ApiError(
      404,

      "Review not found",
    );
  }

  if (review.user.toString() !== userId.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  await reviewRepository.delete(reviewId);

  return true;
}
