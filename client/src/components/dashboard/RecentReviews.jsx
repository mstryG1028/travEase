function RecentReviews({ reviews = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Reviews</h2>

      {reviews.length === 0 ? (
        <p>No Reviews</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border-b py-4">
            <h3 className="font-semibold">{review.user.fullName}</h3>

            <p className="text-yellow-500">⭐ {review.rating}</p>

            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentReviews;
