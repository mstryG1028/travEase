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
    <div
      className="
      max-w-6xl
      mx-auto
      my-10
      "
    >
      {/* Search Box */}

      <div
        className="
        bg-surface
        rounded-xl
        shadow-theme
        border
        border-theme
        p-6
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-theme
          "
        >
          🤖 AI Stay Finder
        </h1>

        <p
          className="
          text-muted
          mt-2
          "
        >
          Describe your dream stay.
        </p>

        <textarea
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="
          input-theme
          mt-5
          "
          placeholder="
          Need a villa in Goa under ₹6000 with pool...
          "
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="
          btn-primary
          mt-4
          "
        >
          {loading ? "Searching..." : "Find with AI"}
        </button>

        {error && (
          <p
            className="
              text-danger
              mt-4
              "
          >
            {error}
          </p>
        )}
      </div>

      {/* Recommendations */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        mt-10
        "
      >
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
