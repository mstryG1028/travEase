import eventBus from "../events/eventBus.js";
import * as notificationService from "../services/notification/notification.service.js";

import { BOOKING_CREATED } from "../events/booking.events.js";
import { createConversation } from "../services/chat/chat.service.js";

import { Notification, Chat } from "../models/index.js";
await createConversation(booking._id);


eventBus.on(
  BOOKING_CREATED,

  async ({
    booking,

    listing,

    guest,
  }) => {
    // Notification

    await Notification.create({
      user: listing.owner,

      title: "New Booking",

      message: `${guest.fullName} booked your property.`,
    });

    await notificationService.createNotification({
      user: listing.owner,

      title: "New Booking",

      message: `${guest.fullName} booked your listing.`,

      type: "BOOKING",

      referenceId: booking._id,
    });

    // Guest Notification

    await notificationService.createNotification({
      user: guest._id,

      title: "Booking Confirmed",

      message: "Your booking request has been submitted successfully.",

      type: "BOOKING",

      referenceId: booking._id,
    });

    // Chat Creation

    await Chat.create({
      booking: booking._id,

      listing: listing._id,

      guest: guest._id,

      owner: listing.owner,
    });

    console.log("Booking Event Executed");
  },
);
