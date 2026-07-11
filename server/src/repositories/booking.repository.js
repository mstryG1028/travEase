import { Booking } from "../models/index.js";

class BookingRepository {
  async create(data, session = null) {
    return Booking.create([data], { session }).then((res) => res[0]);
  }

  async find(filter = {}) {
    return Booking.find(filter)
      .populate("listing")
      .populate("guest", "fullName email avatar")
      .populate("owner", "fullName email avatar")
      .sort({
        createdAt: -1,
      });
  }

  async findOne(filter) {
    return Booking.findOne(filter)
      .populate("listing")
      .populate("guest", "fullName email avatar")
      .populate("owner", "fullName email avatar");
  }

  async findById(id) {
    return Booking.findById(id)
      .populate("listing")
      .populate("guest")
      .populate("owner");
  }

  async update(id, data) {
    return Booking.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return Booking.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return Booking.deleteMany(filter);
  }

  async exists(filter) {
    return Booking.exists(filter);
  }

  async count(filter = {}) {
    return Booking.countDocuments(filter);
  }

  async aggregate(pipeline) {
    return Booking.aggregate(pipeline);
  }

  // ===========================
  // Custom Methods
  // ===========================

  async findByGuest(userId) {
    return Booking.find({
      guest: userId,
    })
      .populate("listing", "title image city state currentPrice contactPerson")
      .populate("owner", "fullName phone email avatar")
      .sort({
        createdAt: -1,
      });
  }

  async findByOwner(userId) {
    return Booking.find({
      owner: userId,
    })
      .populate("listing", "title image city state currentPrice")
      .populate("guest", "fullName phone email avatar")
      .sort({
        createdAt: -1,
      });
  }

  async findActiveBooking(listingId) {
    return Booking.findOne({
      listing: listingId,
      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },
      checkOut: {
        $gte: new Date(),
      },
    })
      .select("bookingId checkIn checkOut guest")
      .populate("guest", "fullName");
  }

  // ===========================
  // Has Active Bookings
  // ===========================

  async hasActiveBookings(listingId) {
    return Booking.exists({
      listing: listingId,
      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },
      checkOut: {
        $gte: new Date(),
      },
    });
  }

  async isDateBooked(listingId, checkIn, checkOut) {
    return Booking.exists({
      listing: listingId,

      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },

      $or: [
        {
          checkIn: {
            $lt: checkOut,
          },

          checkOut: {
            $gt: checkIn,
          },
        },
      ],
    });
  }
}

export default new BookingRepository();
