import { Booking } from "../../../models/index.js";

class AvailabilityTool {
  async execute(listing, parameters = {}) {
    const { checkIn, checkOut, days } = parameters;

    if (days) {
      return await this.getAvailableDates(listing.id, Number(days));
    }

    if (checkIn && checkOut) {
      return await this.checkDateRange(
        listing.id,
        new Date(checkIn),
        new Date(checkOut),
      );
    }

    if (checkIn) {
      return await this.checkSingleDate(listing.id, new Date(checkIn));
    }

    return {
      requiresInput: true,
      message:
        "Please provide booking dates. Example: Can I book on 15 August?",
    };
  }

  async checkSingleDate(listingId, date) {
    const booking = await Booking.findOne({
      listing: listingId,
      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },
      checkIn: {
        $lte: date,
      },
      checkOut: {
        $gt: date,
      },
    });

    return {
      type: "single-date",

      date,

      available: !booking,
    };
  }

  async checkDateRange(listingId, checkIn, checkOut) {
    const overlap = await Booking.find({
      listing: listingId,

      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },

      checkIn: {
        $lt: checkOut,
      },

      checkOut: {
        $gt: checkIn,
      },
    });

    return {
      type: "date-range",

      checkIn,

      checkOut,

      available: overlap.length === 0,
    };
  }

  async getAvailableDates(listingId, days) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const end = new Date(today);

    end.setDate(end.getDate() + days);

    const bookings = await Booking.find({
      listing: listingId,

      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },

      checkIn: {
        $lt: end,
      },

      checkOut: {
        $gt: today,
      },
    }).select("checkIn checkOut");

    const bookedDays = new Set();

    bookings.forEach((booking) => {
      let current = new Date(booking.checkIn);

      while (current < booking.checkOut) {
        bookedDays.add(current.toISOString().split("T")[0]);

        current.setDate(current.getDate() + 1);
      }
    });

    const availableDates = [];

    let current = new Date(today);

    while (current <= end) {
      const key = current.toISOString().split("T")[0];

      if (!bookedDays.has(key)) {
        availableDates.push(key);
      }

      current.setDate(current.getDate() + 1);
    }

    return {
      type: "available-days",

      totalDays: days,

      availableDates,

      availableRanges: this.groupDates(availableDates),
    };
  }

  groupDates(dates) {
    if (!dates.length) return [];

    const ranges = [];

    let start = new Date(dates[0]);

    let end = new Date(dates[0]);

    for (let i = 1; i < dates.length; i++) {
      const current = new Date(dates[i]);

      const expected = new Date(end);

      expected.setDate(expected.getDate() + 1);

      if (current.toDateString() === expected.toDateString()) {
        end = current;
      } else {
        ranges.push({
          from: start.toISOString().split("T")[0],

          to: end.toISOString().split("T")[0],
        });

        start = current;

        end = current;
      }
    }

    ranges.push({
      from: start.toISOString().split("T")[0],

      to: end.toISOString().split("T")[0],
    });

    return ranges;
  }
}

export default new AvailabilityTool();
