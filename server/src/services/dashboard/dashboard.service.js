import { ListingAnalytics, Booking } from "../../models/index.js";

export async function ownerDashboard(ownerId) {
  const analytics = await ListingAnalytics.find()

    .populate({
      path: "listing",

      match: {
        owner: ownerId,
      },
    });

  const bookings = await Booking.find({
    owner: ownerId,
  });

  const totalRevenue = bookings.reduce(
    (sum, item) => sum + item.totalAmount,

    0,
  );

  const totalBookings = bookings.length;

  const topListings = analytics

    .filter((a) => a.listing)

    .sort((a, b) => b.totalBookings - a.totalBookings)

    .slice(0, 5);

  return { // some updates needed
    totalRevenue,

    totalBookings,

    topListings,
  };
}
