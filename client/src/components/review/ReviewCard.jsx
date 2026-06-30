import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center gap-4">
        <img
          src={review.user?.avatar?.url || "https://placehold.co/60x60"}
          alt={review.user?.fullName}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">{review.user?.fullName}</h3>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-gray-600">{review.comment}</p>

      <p className="text-sm text-gray-400 mt-4">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ReviewCard;
