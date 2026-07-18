import { useState } from "react";
import useRecommendation from "../../hooks/useRecommendation";
import RecommendationCard from "./RecommendationCard";

export default function AIRecommendation() {
  const [question, setQuestion] = useState("");

  const { loading, recommendations, search, error } = useRecommendation();

  const handleSearch = async () => {
    if (!question.trim()) return;

    await search(question);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">🤖 AI Stay Finder</h1>

        <p className="text-gray-600 mt-2">Describe your dream stay.</p>

        <textarea
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mt-5 border rounded-lg p-4"
          placeholder="Need a villa in Goa under ₹6000 with pool..."
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          {loading ? "Searching..." : "Find with AI"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {(recommendations || []).map((recommendation) => (
          <RecommendationCard
            key={recommendation.listing._id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  );
}
