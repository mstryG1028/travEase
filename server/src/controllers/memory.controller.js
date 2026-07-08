import { Booking, Memory } from "../models/index.js";

import {
  uploadMemoryMedia,
  deleteMemoryMedia,
} from "../services/memory/memory.service.js";

import  ApiError  from "../utils/ApiError.js";
import  ApiResponse from "../utils/ApiResponse.js";
import  asyncHandler  from "../utils/asyncHandler.js";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const getAuthorizedMemory = async (memoryId, userId) => {
  const memory = await Memory.findById(memoryId);

  if (!memory) {
    throw new ApiError(404, "Memory not found.");
  }

  if (memory.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized.");
  }

  return memory;
};

/*
|--------------------------------------------------------------------------
| Generate Default Title
|--------------------------------------------------------------------------
*/

const generateTitle = () => {
  const today = new Date();

  return `Memory • ${today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
};

/*
|--------------------------------------------------------------------------
| CREATE MEMORY
|--------------------------------------------------------------------------
*/

export const createMemory = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const { title = "", caption = "" } = req.body;

  const booking = await Booking.findById(bookingId).populate("listing");

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (booking.guest.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized.");
  }

  if (booking.bookingStatus !== "Completed") {
    throw new ApiError(
      400,
      "You can create memories only after completing your trip.",
    );
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "Please upload at least one photo or video.");
  }

  const uploadedMedia = await uploadMemoryMedia(req.files);

  const memory = await Memory.create({
    booking: booking._id,

    listing: booking.listing._id,

    user: booking.guest,

    title: title.trim() || generateTitle(),

    caption: caption.trim(),

    media: uploadedMedia,
  });

  const createdMemory = await Memory.findById(memory._id)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  return res
    .status(201)
    .json(new ApiResponse(201, createdMemory, "Memory created successfully."));
});

/*
|--------------------------------------------------------------------------
| GET BOOKING MEMORIES
|--------------------------------------------------------------------------
*/

export const getBookingMemories = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (booking.guest.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized.");
  }

  const memories = await Memory.find({
    booking: bookingId,

    user: req.user._id,
  })
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .sort({
      createdAt: -1,
    });

  return res
    .status(200)
    .json(new ApiResponse(200, memories, "Memories fetched successfully."));
});

/*
|--------------------------------------------------------------------------
| GET SINGLE MEMORY
|--------------------------------------------------------------------------
*/

export const getMemoryById = asyncHandler(async (req, res) => {
  const { memoryId } = req.params;

  const memory = await Memory.findById(memoryId)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  if (!memory) {
    throw new ApiError(404, "Memory not found.");
  }

  if (memory.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, memory, "Memory fetched successfully."));
});

/*
|--------------------------------------------------------------------------
| UPDATE MEMORY
|--------------------------------------------------------------------------
*/

export const updateMemory = asyncHandler(async (req, res) => {
  const { memoryId } = req.params;

  const { title, caption } = req.body;

  const memory = await getAuthorizedMemory(memoryId, req.user._id);

  if (title !== undefined) {
    memory.title = title.trim();
  }

  if (caption !== undefined) {
    memory.caption = caption.trim();
  }

  await memory.save();

  const updatedMemory = await Memory.findById(memory._id)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMemory, "Memory updated successfully."));
});

/*
|--------------------------------------------------------------------------
| ADD MORE MEDIA
|--------------------------------------------------------------------------
*/

export const addMedia = asyncHandler(async (req, res) => {
  const { memoryId } = req.params;

  const memory = await getAuthorizedMemory(memoryId, req.user._id);

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "Please upload at least one photo or video.");
  }

  if (memory.media.length + req.files.length > 50) {
    throw new ApiError(400, "Maximum 50 media files allowed.");
  }

  const uploadedMedia = await uploadMemoryMedia(req.files);

  memory.media.push(...uploadedMedia);

  await memory.save();

  const updatedMemory = await Memory.findById(memory._id)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMemory, "Media added successfully."));
});

/*
|--------------------------------------------------------------------------
| DELETE MEDIA
|--------------------------------------------------------------------------
*/

export const deleteMedia = asyncHandler(async (req, res) => {
  const { memoryId, mediaId } = req.params;

  const memory = await getAuthorizedMemory(memoryId, req.user._id);

  const media = memory.media.id(mediaId);

  if (!media) {
    throw new ApiError(404, "Media not found.");
  }

  if (memory.media.length === 1) {
    throw new ApiError(400, "A memory must contain at least one media file.");
  }

  await deleteMemoryMedia([media]);

  memory.media.pull(mediaId);

  if (memory.coverMedia && memory.coverMedia.toString() === mediaId) {
    memory.coverMedia = memory.media[0]?._id || null;
  }

  await memory.save();

  const updatedMemory = await Memory.findById(memory._id)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMemory, "Media deleted successfully."));
});

/*
|--------------------------------------------------------------------------
| UPDATE COVER
|--------------------------------------------------------------------------
*/

export const updateCover = asyncHandler(async (req, res) => {
  const { memoryId } = req.params;

  const { mediaId } = req.body;

  const memory = await getAuthorizedMemory(memoryId, req.user._id);

  const exists = memory.media.some((item) => item._id.toString() === mediaId);

  if (!exists) {
    throw new ApiError(404, "Selected media not found.");
  }

  memory.coverMedia = mediaId;

  await memory.save();

  const updatedMemory = await Memory.findById(memory._id)
    .populate({
      path: "listing",
      select: "title city state country image",
    })
    .populate({
      path: "booking",
      select: "checkIn checkOut bookingStatus",
    });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMemory, "Cover updated successfully."));
});

/*
|--------------------------------------------------------------------------
| DELETE MEMORY
|--------------------------------------------------------------------------
*/

export const deleteMemory = asyncHandler(async (req, res) => {
  const { memoryId } = req.params;

  const memory = await getAuthorizedMemory(memoryId, req.user._id);

  await deleteMemoryMedia(memory.media);

  await Memory.findByIdAndDelete(memory._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Memory deleted successfully."));
});
