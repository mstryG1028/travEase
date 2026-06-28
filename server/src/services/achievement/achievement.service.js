import achievementRepository from "../../repositories/achievement.repository.js";

import { Booking, Listing } from "../../models/index.js";

async function unlock(
  user,

  badge,

  title,

  description,

  icon,

  points = 10,
) {
  const exists = await achievementRepository.exists(
    user,

    badge,
  );

  if (exists) {
    return;
  }

  await achievementRepository.create({
    user,

    badge,

    title,

    description,

    icon,

    points,
  });
}

// =======================================

export async function checkAchievements(bookingId) {
  const booking = await Booking.findById(bookingId)

    .populate("listing");

  if (!booking) {
    return;
  }

  const listing = booking.listing;

  const user = booking.guest;

  // Beach Explorer

  if (listing.category === "Beach") {
    await unlock(
      user,

      "BEACH",

      "Beach Explorer",

      "Stayed at a beach property",

      "🏖",

      20,
    );
  }

  // Mountain Explorer

  if (listing.category === "Mountain") {
    await unlock(
      user,

      "MOUNTAIN",

      "Mountain Explorer",

      "Stayed in mountains",

      "🏔",

      20,
    );
  }

  // Luxury Traveller

  if (booking.totalAmount >= 10000) {
    await unlock(
      user,

      "LUXURY",

      "Luxury Traveller",

      "Booked a luxury stay",

      "💎",

      30,
    );
  }

  // Frequent Traveller

  const completed = await Booking.countDocuments({
    guest: user,

    bookingStatus: "Completed",
  });

  if (completed >= 10) {
    await unlock(
      user,

      "FREQUENT",

      "Frequent Traveller",

      "Completed 10 trips",

      "🔥",

      50,
    );
  }

  // Globe Trotter

  const cities = await Booking.aggregate([
    {
      $match: {
        guest: user,
      },
    },

    {
      $lookup: {
        from: "listings",

        localField: "listing",

        foreignField: "_id",

        as: "listing",
      },
    },

    {
      $unwind: "$listing",
    },

    {
      $group: {
        _id: "$listing.city",
      },
    },
  ]);

  if (cities.length >= 10) {
    await unlock(
      user,

      "GLOBE",

      "Globe Trotter",

      "Visited 10 cities",

      "🌍",

      100,
    );
  }
}

// =======================================

export async function myAchievements(user) {
  return await achievementRepository.find({
    user,
  });
}
