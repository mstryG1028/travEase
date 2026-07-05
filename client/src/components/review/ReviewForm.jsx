import { useState } from "react";
import { FaStar } from "react-icons/fa";

import { successToast, errorToast } from "../../utils/toast";
import { createReview } from "../../services/review.service";

function ReviewForm({ bookingId, listingId, refreshReviews }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createReview({
        booking: bookingId,
        listing: listingId,
        rating,
        comment,
      });

      successToast("Review Added");

      setComment("");
      setRating(5);

      refreshReviews();
    } catch (error) {
      errorToast(error.response?.data?.message || "Unable to add review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submitReview}
      className="bg-surface rounded-2xl border border-theme shadow-theme p-6 space-y-5"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-primary">Write Review</h2>

      {/* ⭐ STAR RATING UI */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={26}
            onClick={() => setRating(star)}
            className={`cursor-pointer transition ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-secondary">Selected Rating: {rating} / 5</p>

      {/* Comment */}
      <textarea
        rows={5}
        className="w-full p-3 rounded-xl border border-theme bg-surface text-primary outline-none focus:border-[var(--primary)] resize-none"
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Button */}
      <button
        disabled={loading}
        className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
