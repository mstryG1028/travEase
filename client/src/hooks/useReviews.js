import { useEffect, useState } from "react";
import * as reviewService from "../services/review.service";

function useReviews(listingId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listingId) {
      fetchReviews();
    }
  }, [listingId]);

  async function fetchReviews() {
    try {
      const response = await reviewService.getReviews(listingId);
      setReviews(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    reviews,
    loading,
    fetchReviews,
  };
}

export default useReviews;
