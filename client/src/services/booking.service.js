import api from "../api/axios";

export const createBooking = (data) => {
  return api.post("/bookings", data);
};

export const getMyBookings = () => {
  return api.get("/bookings/my-bookings");
};

export const cancelBooking = (id) => {
  return api.patch(`/bookings/${id}/cancel`);
};
