import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import useReviews from "../../hooks/useReviews";

function ReviewSection({ listingId, bookingId }) {
  const { reviews, loading, fetchReviews } = useReviews(listingId);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">Reviews ({reviews.length})</h2>

      {bookingId && (
        <ReviewForm
          bookingId={bookingId}
          listingId={listingId}
          refreshReviews={fetchReviews}
        />
      )}

      <div className="mt-10 space-y-6">
        {reviews.length === 0 ? (
          <p>No Reviews Yet</p>
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
