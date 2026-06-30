import { useState } from "react";
import toast from "react-hot-toast";

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

      toast.success("Review Added");

      setComment("");
      setRating(5);

      refreshReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submitReview}
      className="bg-white rounded-2xl shadow p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Write Review</h2>

      <select
        className="border rounded-lg p-3 w-full"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <textarea
        rows={5}
        className="border rounded-lg p-3 w-full"
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
