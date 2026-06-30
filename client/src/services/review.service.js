import api from "../api/axios";

export const getReviews = (listingId) => {
  return api.get(`/reviews/listing/${listingId}`);
};

export const createReview = (data) => {
  return api.post("/reviews", data);
};

export const deleteReview = (id) => {
  return api.delete(`/reviews/${id}`);
};