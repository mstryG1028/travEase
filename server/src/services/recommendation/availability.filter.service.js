import bookingRepository from "../../repositories/booking.repository.js";

class AvailabilityFilterService {
  async filter(listings, filters) {
    if (!filters.checkIn || !filters.checkOut) {
      return listings;
    }

    const available = [];

    for (const listing of listings) {
      const booked = await bookingRepository.isDateBooked(
        listing._id,
        new Date(filters.checkIn),
        new Date(filters.checkOut),
      );

      if (!booked) {
        available.push(listing);
      }
    }

    console.log("Available Listings:", available.length);

    return available;
  }
}

export default new AvailabilityFilterService();
