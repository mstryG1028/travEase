import { Review } from "../../../models/index.js";

class ReviewTool {
  async execute(listing) {
    const reviews = await Review.find({
      listing: listing.id,
    }).select("rating comment");

    if (!reviews.length) {
      return {
        averageRating: 0,
        totalReviews: 0,
        recentReviews: [],
      };
    }

    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return {
      averageRating: Number(average.toFixed(1)),
      totalReviews: reviews.length,
      recentReviews: reviews
        .slice(-5)
        .map((review) => review.comment)
        .filter(Boolean),
    };
  }
}

export default new ReviewTool();
