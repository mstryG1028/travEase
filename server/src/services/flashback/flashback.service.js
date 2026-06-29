import flashbackRepository from "../../repositories/flashback.repository.js";

import { Booking } from "../../models/index.js";

import {
  uploadOnCloudinary,

} from "../../utils/cloudinary.js";

import ApiError from "../../utils/ApiError.js";

export async function createFlashback(
  body,

  files,

  user,
) {
  const booking = await Booking.findById(body.booking);

  if (!booking) {
    throw new ApiError(
      404,

      "Booking not found",
    );
  }

  if (booking.guest.toString() !== user._id.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  if (booking.bookingStatus !== "Completed") {
    throw new ApiError(
      400,

      "Only completed bookings can upload flashbacks",
    );
  }

  let images = [];

  if (files?.length) {
    for (const file of files) {
      const uploaded = await uploadOnCloudinary(file.path);

      images.push({
        url: uploaded.secure_url,

        public_id: uploaded.public_id,
      });
    }
  }

  return await flashbackRepository.create({
    booking: booking._id,

    listing: booking.listing,

    user: user._id,

    caption: body.caption,

    visibility: body.visibility,

    images,
  });
}

export async function listingFlashbacks(listingId) {
  return await flashbackRepository.find({
    listing: listingId,

    visibility: "Public",
  });
}

export async function myFlashbacks(userId) {
  return await flashbackRepository.find({
    user: userId,
  });
}

export async function likeFlashback(
  id,

  userId,
) {
  const flashback = await flashbackRepository.findById(id);

  if (!flashback) {
    throw new ApiError(
      404,

      "Flashback not found",
    );
  }

  const already = flashback.likes.some(
    (like) => like.toString() === userId.toString(),
  );

  if (already) {
    flashback.likes = flashback.likes.filter(
      (id) => id.toString() !== userId.toString(),
    );
  } else {
    flashback.likes.push(userId);
  }

  flashback.likesCount = flashback.likes.length;

  await flashbackRepository.save(flashback);
  return flashback;
}

export async function deleteFlashback(
  id,

  userId,
) {
  const flashback = await flashbackRepository.findById(id);

  if (!flashback) {
    throw new ApiError(
      404,

      "Flashback not found",
    );
  }

  if (flashback.user.toString() !== userId.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  for (const image of flashback.images) {
    await deleteFromCloudinary(image.public_id);
  }

  await flashbackRepository.delete(id);
}
