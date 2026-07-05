function RecentReviews({ reviews = [] }) {
  return (
    <div className="dashboard-card">
      <h2 className="mb-6 text-2xl font-bold text-theme">Latest Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-muted">No Reviews</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="divider-bottom py-4">
              <h3 className="font-semibold text-theme">
                {review.user.fullName}
              </h3>

              <p className="mt-1 text-yellow-500 font-medium">
                ⭐ {review.rating}
              </p>

              <p className="mt-2 text-muted">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentReviews;
