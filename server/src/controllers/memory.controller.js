import memoryService from "../services/memory/memory.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

/*
|--------------------------------------------------------------------------
| GET MY MEMORIES
|--------------------------------------------------------------------------
*/

export const getMyMemories = asyncHandler(async (req, res) => {
  const memories = await memoryService.getMyMemories(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, memories, "Memories fetched successfully."));
});

/*
|--------------------------------------------------------------------------
| CREATE MEMORY
|--------------------------------------------------------------------------
*/

export const createMemory = asyncHandler(async (req, res) => {
  const memory = await memoryService.createMemory(
    req.params.bookingId,
    req.user._id,
    req.body,
    req.files,
  );

  return res
    .status(201)
    .json(new ApiResponse(201, memory, "Memory created successfully."));
});

/*
|--------------------------------------------------------------------------
| GET BOOKING MEMORIES
|--------------------------------------------------------------------------
*/

export const getBookingMemories = asyncHandler(async (req, res) => {
  const memories = await memoryService.getBookingMemories(
    req.params.bookingId,
    req.user._id,
  );

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
  const memory = await memoryService.getMemory(
    req.params.memoryId,
    req.user._id,
  );

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
  const memory = await memoryService.updateMemory(
    req.params.memoryId,
    req.user._id,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, memory, "Memory updated successfully."));
});

/*
|--------------------------------------------------------------------------
| ADD MORE MEDIA
|--------------------------------------------------------------------------
*/

export const addMedia = asyncHandler(async (req, res) => {
  const memory = await memoryService.addMedia(
    req.params.memoryId,
    req.user._id,
    req.files,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, memory, "Media added successfully."));
});

/*
|--------------------------------------------------------------------------
| DELETE MEDIA
|--------------------------------------------------------------------------
*/

export const deleteMedia = asyncHandler(async (req, res) => {
  const memory = await memoryService.deleteMedia(
    req.params.memoryId,
    req.params.mediaId,
    req.user._id,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, memory, "Media deleted successfully."));
});

/*
|--------------------------------------------------------------------------
| UPDATE COVER
|--------------------------------------------------------------------------
*/

export const updateCover = asyncHandler(async (req, res) => {
  const memory = await memoryService.updateCover(
    req.params.memoryId,
    req.body.mediaId,
    req.user._id,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, memory, "Cover updated successfully."));
});

/*
|--------------------------------------------------------------------------
| DELETE MEMORY
|--------------------------------------------------------------------------
*/

export const deleteMemory = asyncHandler(async (req, res) => {
  await memoryService.deleteMemory(req.params.memoryId, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Memory deleted successfully."));
});
