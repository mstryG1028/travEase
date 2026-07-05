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

import { BOOKING_STATUS,PAYMENT_STATUS } from "../../constants/booking.constants.js";

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
    // Check Availability (Optimized Query)
    // ==========================================

    const overlap = await bookingRepository.exists({
      listing: listing._id,

      bookingStatus: {
        $in: [BOOKING_STATUS.PENDING, BOOKING_STATUS.CONFIRMED],
      },

      checkIn: {
        $lt: new Date(data.checkOut),
      },

      checkOut: {
        $gt: new Date(data.checkIn),
      },
    });

    if (overlap) {
      throw new ApiError(400, "Selected dates are already booked");
    }

    // ==========================================
    // Dynamic Pricing
    // ==========================================

    const pricing = await calculatePrice(listing._id, data.checkIn);

    // ==========================================
    // Create Booking
    // ==========================================

    const booking = await bookingRepository.create(
      {
        guest: user._id,

        owner: listing.owner?._id || listing.owner,

        listing: listing._id,

        checkIn: data.checkIn,

        checkOut: data.checkOut,

        totalNights: data.totalNights,

        guests: data.guests,

        pricePerNight: pricing.finalPrice,

        taxes: data.taxes || 0,

        serviceFee: data.serviceFee || 0,

        discount: data.discount || 0,

        totalAmount: data.totalAmount,

        contactPerson: listing.contactPerson,

        bookingStatus: BOOKING_STATUS.COMPLETED,
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
    // Listing Analytics
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
    // Block Calendar
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
    // Emit Event
    // ==========================================

    eventBus.emit(BOOKING_CREATED, {
      booking,
      listing,
      guest: user,
    });

    // ==========================================
    // Commit Transaction
    // ==========================================

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
// My Bookings
// ===================================================

export async function myBookings(userId) {
  return await Booking.find({
    guest: userId,
  })
    .populate("listing", "title image city state currentPrice contactPerson")
    .populate("owner", "fullName phone email")
    .sort({
      createdAt: -1,
    })
    .lean();
}

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
  return await bookingRepository.find({
    owner: ownerId,
  });
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
