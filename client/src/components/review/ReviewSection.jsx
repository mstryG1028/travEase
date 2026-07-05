import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import useReviews from "../../hooks/useReviews";

function ReviewSection({ listingId, bookingId }) {
  const { reviews, loading, fetchReviews } = useReviews(listingId);

  if (loading) {
    return (
      <p className="text-secondary text-center py-10">Loading reviews...</p>
    );
  }

  return (
    <section className="mt-16">
      {/* Header */}
      <h2 className="text-3xl font-bold text-primary mb-8">
        Reviews ({reviews.length})
      </h2>

      {/* Review Form */}
      {bookingId && (
        <div className="mb-10">
          <ReviewForm
            bookingId={bookingId}
            listingId={listingId}
            refreshReviews={fetchReviews}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-surface rounded-2xl border border-theme">
            <p className="text-secondary">No Reviews Yet</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}

export default ReviewSection;
