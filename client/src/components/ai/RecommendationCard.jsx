import { FaStar, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

export default function RecommendationCard({ recommendation }) {
  const { listing, reason, score } = recommendation;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <img
        src={listing.image.url}
        alt={listing.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{listing.title}</h2>

          <span className="font-bold text-green-600">
            ₹{listing.currentPrice}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <FaMapMarkerAlt />

          <span>
            {listing.city}, {listing.state}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <FaStar className="text-yellow-500" />

          <span>{listing.averageRating}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <FaUsers />

          <span>{listing.guests} Guests</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {listing.amenities.slice(0, 5).map((item) => (
            <span
              key={item}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-sm text-gray-700">🤖 {reason}</p>
        </div>

        <div className="mt-3 text-sm">
          Relevance Score
          <span className="font-bold ml-2">{score}</span>
        </div>
      </div>
    </div>
  );
}
