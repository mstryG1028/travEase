import api from "../api/axios";

// Create Booking
export const createBooking = (data) => {
  return api.post("/bookings", data);
};

// My Bookings
export const getMyBookings = () => {
  return api.get("/bookings/my-bookings");
};

// Owner Bookings
export const getOwnerBookings = () => {
  return api.get("/bookings/owner-bookings");
};

// Single Booking
export const getBookingDetails = (id) => {
  return api.get(`/bookings/${id}`);
};

// Cancel Booking
export const cancelBooking = (id) => {
  return api.patch(`/bookings/cancel/${id}`);
};

// Complete Booking
export const completeBooking = (id) => {
  return api.patch(`/bookings/complete/${id}`);
};

// Unavailable Dates
export const getUnavailableDates = (listingId) => {
  return api.get(`/bookings/availability?listingId=${listingId}`);
};

// Owner Dashboard
export const ownerDashboard = () => {
  return api.get("/bookings/dashboard");
};
