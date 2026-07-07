import mongoose from "mongoose";

import bookingRepository from "../../repositories/booking.repository.js";
import listingRepository from "../../repositories/listing.repository.js";

import eventBus from "../../events/eventBus.js";
import { BOOKING_CREATED } from "../../events/booking.event.js";

import { Booking, ListingAnalytics } from "../../models/index.js";
import { Chat } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

import { checkAchievements } from "../achievement/achievement.service.js";
import { calculatePrice } from "../pricing/pricing.service.js";
import {
  blockDates,
  unblockDates,
} from "../availability/availability.service.js";

import * as notificationService from "../notification/notification.service.js";

import {
  BOOKING_STATUS,
  PAYMENT_STATUS,
} from "../../constants/booking.constants.js";

// ===================================================
// Create Booking
// ===================================================

export async function createBooking(data, user) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // ==========================================
    // Find Listing
    // ==========================================

    const listing = await listingRepository.findById(data.listing);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    // ==========================================
    // Prevent Self Booking
    // ==========================================

    if (listing.owner.toString() === user._id.toString()) {
      throw new ApiError(400, "You cannot book your own listing.");
    }

    // ==========================================
    // Validate Dates
    // ==========================================

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      throw new ApiError(400, "Check-in date cannot be in the past.");
    }

    if (checkOut <= checkIn) {
      throw new ApiError(400, "Check-out date must be after check-in.");
    }

    // ==========================================
    // Validate Guests
    // ==========================================

    if (!data.guests || data.guests < 1) {
      throw new ApiError(400, "Guests must be at least 1.");
    }

    if (listing.maxGuests && data.guests > listing.maxGuests) {
      throw new ApiError(400, `Maximum ${listing.maxGuests} guests allowed.`);
    }

    // ==========================================
    // Check Availability
    // ==========================================

    const overlap = await bookingRepository.exists({
      listing: listing._id,

      bookingStatus: {
        $in: [
          BOOKING_STATUS.PENDING,
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.ACTIVE,
        ],
      },

      checkIn: {
        $lt: checkOut,
      },

      checkOut: {
        $gt: checkIn,
      },
    });

    if (overlap) {
      throw new ApiError(400, "Selected dates are already booked.");
    }

    // ==========================================
    // Pricing
    // ==========================================

    const pricing = await calculatePrice(listing._id);

    const totalNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const pricePerNight = pricing.finalPrice;

    const taxes = 0;

    const serviceFee = 0;

    const discount = 0;

    const totalAmount =
      totalNights * pricePerNight + taxes + serviceFee - discount;

    // ==========================================
    // Create Booking
    // ==========================================

    const booking = await bookingRepository.create(
      {
        guest: user._id,

        owner: listing.owner,

        listing: listing._id,

        checkIn,

        checkOut,

        totalNights,

        guests: data.guests,

        pricePerNight,

        taxes,

        serviceFee,

        discount,

        totalAmount,

        contactPerson: listing.contactPerson,

        bookingStatus: BOOKING_STATUS.CONFIRMED,

        paymentStatus: PAYMENT_STATUS.PENDING,
      },
      session,
    );

    await Chat.create({
      booking: booking._id,
      listing: listing._id,
      guest: user._id,
      owner: listing.owner,
    });

    // ==========================================
    // Analytics
    // ==========================================

    const analytics = await ListingAnalytics.findOne({
      listing: listing._id,
    }).session(session);

    if (analytics) {
      analytics.totalBookings += 1;
      analytics.revenue += booking.totalAmount;

      await analytics.save({ session });
    }

    // ==========================================
    // Block Dates
    // ==========================================

    await blockDates(listing._id, booking.checkIn, booking.checkOut);

    // ==========================================
    // Notification
    // ==========================================

    await notificationService.createNotification({
      user: listing.owner,

      title: "New Booking",

      message: `${user.fullName} booked your property.`,

      type: "BOOKING",

      referenceId: booking._id,
    });

    // ==========================================
    // Event
    // ==========================================

    eventBus.emit(BOOKING_CREATED, {
      booking,
      listing,
      guest: user,
    });

    await session.commitTransaction();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// ===================================================
//   Helper fn to  update Booking Status
// ===================================================

function updateBookingStatus(booking) {
  if (booking.bookingStatus === BOOKING_STATUS.CANCELLED) {
    return booking;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = new Date(booking.checkIn);
  checkIn.setHours(0, 0, 0, 0);

  const checkOut = new Date(booking.checkOut);
  checkOut.setHours(0, 0, 0, 0);

  if (today >= checkOut) {
    booking.bookingStatus = BOOKING_STATUS.COMPLETED;
  } else if (today >= checkIn) {
    booking.bookingStatus = BOOKING_STATUS.ACTIVE;
  } else {
    booking.bookingStatus = BOOKING_STATUS.CONFIRMED;
  }

  return booking;
}

// ===================================================
// My Bookings
// ===================================================

export async function myBookings(userId) {
  const bookings = await Booking.find({
    guest: userId,
  })
    .populate("listing", "title image city state currentPrice contactPerson")
    .populate("owner", "fullName phone email")
    .sort({
      createdAt: -1,
    });

  let changed = false;

  bookings.forEach((booking) => {
    const previous = booking.bookingStatus;

    updateBookingStatus(booking);

    if (previous !== booking.bookingStatus) {
      changed = true;
    }
  });

  if (changed) {
    await Promise.all(bookings.map((booking) => booking.save()));
  }

  return bookings;
}

// ===================================================
// Bookings Details
// ===================================================

export async function bookingDetails(id) {
  const booking = await Booking.findById(id)
    .populate(
      "listing",
      "title image address city state currentPrice contactPerson",
    )
    .populate("guest", "fullName email phone")
    .populate("owner", "fullName email phone")
    .lean();

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
}

// ===================================================
// Owner Bookings
// ===================================================

export async function ownerBookings(ownerId) {
  const bookings = await bookingRepository.find({
    owner: ownerId,
  });

  let changed = false;

  bookings.forEach((booking) => {
    const previous = booking.bookingStatus;

    updateBookingStatus(booking);

    if (previous !== booking.bookingStatus) {
      changed = true;
    }
  });

  if (changed) {
    await Promise.all(bookings.map((booking) => booking.save()));
  }

  return bookings;
}

// ===================================================
// Cancel Booking
// ===================================================

export async function cancelBooking(bookingId, userId) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (booking.guest._id.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized");
    }

    if (booking.bookingStatus === BOOKING_STATUS.CANCELLED) {
      throw new ApiError(400, "Booking already cancelled");
    }

    booking.bookingStatus = BOOKING_STATUS.CANCELLED;

    await bookingRepository.save(booking);

    // ===============================
    // Unblock Calendar
    // ===============================

    await unblockDates(booking.listing._id, booking.checkIn, booking.checkOut);

    // ===============================
    // Notify Owner
    // ===============================

    await notificationService.createNotification({
      user: booking.owner._id,

      title: "Booking Cancelled",

      message: `${booking.guest.fullName} cancelled the booking.`,

      type: "BOOKING",

      referenceId: booking._id,
    });

    await session.commitTransaction();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// ===================================================
// Complete Booking
// ===================================================

export async function completeBooking(id) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await bookingRepository.findById(id);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    booking.bookingStatus = BOOKING_STATUS.COMPLETED;

    await bookingRepository.save(booking);

    // ===============================
    // Unlock Achievements
    // ===============================

    await checkAchievements(booking._id);

    // ===============================
    // Notify Guest
    // ===============================

    await notificationService.createNotification({
      user: booking.guest._id,

      title: "Trip Completed",

      message: "Hope you enjoyed your stay. Please leave a review.",

      type: "BOOKING",

      referenceId: booking._id,
    });

    await session.commitTransaction();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// ===================================================
// Availability
// ===================================================

export async function availability(listingId, month, year) {
  const bookings = await bookingRepository.find({
    listing: listingId,
    bookingStatus: {
      $in: [BOOKING_STATUS.PENDING, BOOKING_STATUS.CONFIRMED],
    },
  });

  const blockedDates = [];

  bookings.forEach((booking) => {
    let current = new Date(booking.checkIn);

    while (current <= booking.checkOut) {
      blockedDates.push(current.toISOString().split("T")[0]);

      current.setDate(current.getDate() + 1);
    }
  });

  return blockedDates;
}

// ===================================================
// Owner Dashboard
// ===================================================

export async function ownerDashboard(ownerId) {
  const stats = await bookingRepository.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(ownerId),
      },
    },
    {
      $facet: {
        totalBookings: [
          {
            $count: "count",
          },
        ],

        revenue: [
          {
            $match: {
              bookingStatus: BOOKING_STATUS.COMPLETED,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$totalAmount",
              },
            },
          },
        ],

        pending: [
          {
            $match: {
              bookingStatus: BOOKING_STATUS.PENDING,
            },
          },
          {
            $count: "count",
          },
        ],

        completed: [
          {
            $match: {
              bookingStatus: BOOKING_STATUS.COMPLETED,
            },
          },
          {
            $count: "count",
          },
        ],

        cancelled: [
          {
            $match: {
              bookingStatus: BOOKING_STATUS.CANCELLED,
            },
          },
          {
            $count: "count",
          },
        ],

        averageBookingValue: [
          {
            $group: {
              _id: null,
              avg: {
                $avg: "$totalAmount",
              },
            },
          },
        ],
      },
    },
  ]);

  const data = stats[0];

  return {
    totalBookings: data.totalBookings[0]?.count || 0,

    revenue: data.revenue[0]?.total || 0,

    pending: data.pending[0]?.count || 0,

    completed: data.completed[0]?.count || 0,

    cancelled: data.cancelled[0]?.count || 0,

    averageBookingValue: Math.round(data.averageBookingValue[0]?.avg || 0),
  };
}
