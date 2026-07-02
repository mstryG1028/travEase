import {
  ListingAnalytics,
  Booking,
  Listing,
  Review,
} from "../../models/index.js";

export async function ownerDashboard(ownerId) {
  // Analytics
  const analytics = await ListingAnalytics.find().populate({
    path: "listing",
    match: {
      owner: ownerId,
    },
  });

  // Owner Bookings
  const bookings = await Booking.find({
    owner: ownerId,
  })
    .populate("guest", "fullName avatar")
    .populate("listing", "title");

  // Owner Listings
  const totalListings = await Listing.countDocuments({
    owner: ownerId,
  });

  // Revenue
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalAmount,
    0,
  );

  // Total Bookings
  const totalBookings = bookings.length;

  // Pending Bookings
  const pending = bookings.filter(
    (booking) => booking.bookingStatus === "Pending",
  ).length;

  // Completed Bookings
  const completed = bookings.filter(
    (booking) => booking.bookingStatus === "Completed",
  ).length;

  // Recent Bookings
  const recentBookings = [...bookings]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  // Recent Reviews
  const recentReviews = await Review.find({
    owner: ownerId,
  })
    .populate("user", "fullName avatar")
    .populate("listing", "title")
    .sort({ createdAt: -1 })
    .limit(5);

  // Top Listings
  const topListings = analytics
    .filter((item) => item.listing)
    .sort((a, b) => b.totalBookings - a.totalBookings)
    .slice(0, 5);

  return {
    totalRevenue,
    totalBookings,
    pending,
    completed,
    totalListings,
    recentBookings,
    recentReviews,
    topListings,
  };
}
