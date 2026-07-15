import { Booking } from "../../../models/index.js";

class AvailabilityTool {
  async execute({ listing, parameters = {} }) {
    const { checkIn, checkOut, days } = parameters;

    const listingId = listing._id;

    if (days) {
      return this.getAvailableDates(listingId, Number(days));
    }

    if (checkIn && checkOut) {
      return this.checkDateRange(
        listingId,
        new Date(checkIn),
        new Date(checkOut),
      );
    }

    if (checkIn) {
      return this.checkSingleDate(listingId, new Date(checkIn));
    }

    return {
      requiresInput: true,
      message:
        "Please provide booking dates. Example: Can I book on 15 August?",
    };
  }

  // Keep the rest of your methods exactly the same.
}

export default new AvailabilityTool();
