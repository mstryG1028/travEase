import bookingRepository from "../../../repositories/booking.repository.js";
import listingRepository from "../../../repositories/listing.repository.js";
import { success, failure } from "../ai.helper.js";

class AvailabilityTool {
  async execute({ listingId }) {
    console.log("========== AVAILABILITY TOOL ==========");

    try {
      const listing = await listingRepository.findById(listingId);

      if (!listing) {
        return failure("availability", "Listing not found.");
      }

      const today = new Date();

      const availableDates = [];

      // check next 15 days
      for (let i = 0; i < 15; i++) {
        const checkIn = new Date(today);

        checkIn.setDate(today.getDate() + i);

        const checkOut = new Date(checkIn);

        checkOut.setDate(checkIn.getDate() + 1);

        const isBooked = await bookingRepository.isDateBooked(
          listingId,
          checkIn,
          checkOut,
        );

        if (!isBooked) {
          availableDates.push(checkIn.toISOString().split("T")[0]);
        }
      }

      return success(
        "availability",

        availableDates.length
          ? `This property is available on these dates: ${availableDates.join(", ")}.`
          : "This property is not available for the next 15 days.",

        {
          title: listing.title,
          availableDates,
        },
      );
    } catch (err) {
      console.error("AVAILABILITY TOOL ERROR", err);

      return failure(
        "availability",
        "Availability information is currently unavailable.",
      );
    }
  }
}

export default new AvailabilityTool();
