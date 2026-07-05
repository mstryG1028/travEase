import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {
  return (
    <div
      className="
        bg-surface
        rounded-2xl
        shadow-theme
        border
        border-theme
        p-5
        transition-theme
      "
    >
      <div className="flex items-center gap-4">
        <img
          src={review.user?.avatar?.url || "https://placehold.co/60x60"}
          alt={review.user?.fullName}
          className="
            w-14
            h-14
            rounded-full
            object-cover
            border-2
            border-theme
            bg-surface-2
          "
        />

        <div>
          <h3 className="font-semibold text-primary">
            {review.user?.fullName}
          </h3>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-secondary">{review.comment}</p>

      <p className="mt-4 text-sm text-light">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ReviewCard;
