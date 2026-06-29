import api from "../api/axios";

export const getAllListings = (params = {}) => {
  return api.get("/listings", {
    params,
  });
};

export const getListing = (id) => {
  return api.get(`/listings/${id}`);
};

export const createListing = (formData) => {
  return api.post("/listings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateListing = (id, formData) => {
  return api.patch(`/listings/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteListing = (id) => {
  return api.delete(`/listings/${id}`);
};

export const getTrendingListings = () => {
  return api.get("/listings/trending");
};

export const getNearbyListings = (longitude, latitude, distance = 10000) => {
  return api.get("/listings/nearby", {
    params: {
      longitude,
      latitude,
      distance,
    },
  });
};
