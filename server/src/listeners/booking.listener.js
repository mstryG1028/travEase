import eventBus from "../events/eventBus.js";

import {
  BOOKING_CREATED,
  BOOKING_CANCELLED,
  BOOKING_COMPLETED,
} from "../events/booking.event.js";

import { checkAchievements } from "../services/achievement/achievement.service.js";

// ===========================================
// Booking Created
// ===========================================
eventBus.on(BOOKING_CREATED, async (booking) => {
  try {
    await checkAchievements(booking.guest);
  } catch (error) {
    console.error("BOOKING_CREATED listener:", error.message);
  }
});

// ===========================================
// Booking Cancelled
// ===========================================
eventBus.on(BOOKING_CANCELLED, async (booking) => {
  try {
    // Future:
    // - Send cancellation email
    // - Refund payment
    // - Update analytics
  } catch (error) {
    console.error("BOOKING_CANCELLED listener:", error.message);
  }
});

// ===========================================
// Booking Completed
// ===========================================
eventBus.on(BOOKING_COMPLETED, async (booking) => {
  try {
    await checkAchievements(booking.guest);

    // Future:
    // - Request review
    // - Generate travel memory recap
    // - Send thank-you email
  } catch (error) {
    console.error("BOOKING_COMPLETED listener:", error.message);
  }
});
