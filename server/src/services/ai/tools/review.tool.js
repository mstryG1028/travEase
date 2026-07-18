import reviewRepository from "../../../repositories/review.repository.js";
import listingRepository from "../../../repositories/listing.repository.js";
import { success, failure } from "../ai.helper.js";

class ReviewTool {
  async execute({ listingId }) {
    try {
      const listing = await listingRepository.findById(listingId);

      if (!listing) {
        return failure("reviews", "Listing not found.");
      }

      const reviews = await reviewRepository.find({
        listing: listingId,
      });

      const averageRating =
        reviews.length === 0
          ? 0
          : (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1);

      const message =
        reviews.length === 0
          ? "This property has no reviews yet."
          : `Guests have given this property an average rating of ${averageRating}/5 based on ${reviews.length} reviews.`;

      return success("reviews", message, {
        title: listing.title,
        totalReviews: reviews.length,
        averageRating,
        reviews: reviews.slice(0, 5),
      });
    } catch (err) {
      console.error("REVIEW TOOL ERROR");
      console.error(err);

      return failure("reviews", "Reviews are currently unavailable.");
    }
  }
}

export default new ReviewTool();
