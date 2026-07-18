import { useState } from "react";
import recommendationService from "../services/recommendation.service";

export default function useRecommendation() {
  const [loading, setLoading] = useState(false);

  const [recommendations, setRecommendations] = useState([]);

  const [filters, setFilters] = useState(null);

  const [error, setError] = useState("");

  const search = async (question) => {
    try {
      setLoading(true);

      setError("");

      const response = await recommendationService.getRecommendations(question);

      console.log("response is:::",response)
      setRecommendations(response.data?.recommendations || []);

      setFilters(response.data?.filters || {});

      return response;
    } catch (err) {
      setError(err.message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recommendations,
    filters,
    error,
    search,
  };
}
