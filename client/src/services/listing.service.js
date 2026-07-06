import api from "../api/axios";

export const getAllListings = (params = {}) => {
  return api.get("/listings", {
    params,
  });
};

export const getListingById = (id) => {
  return api.get(`/listings/${id}`);
};

export function getMyListings() {
  return api.get("/listings/my-listings");
}

export const becomeHost = (formData) => {
  return api.post("/listings/become-host", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createListing = (formData) => {
  return api.post("/listings/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getSingleListing = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};

export const updateListing = (id, data) => {
  return api.patch(`/listings/${id}`, data, {
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
