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
