import bookingRepository from "../../repositories/booking.repository.js";
import memoryRepository from "../../repositories/memory.repository.js";

import {
  uploadMemoryMedia,
  deleteMemoryMedia,
} from "../../utils/memoryUpload.js";

import ApiError from "../../utils/ApiError.js";

class MemoryService {
  generateTitle() {
    return `Memory • ${new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  }

  async getAuthorizedMemory(memoryId, userId) {
    const memory = await memoryRepository.findById(memoryId);

    if (!memory) {
      throw new ApiError(404, "Memory not found.");
    }

    if (memory.user._id.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not allowed to access this memory.");
    }

    return memory;
  }

  async getMyMemories(userId) {
    return memoryRepository.findByUser(userId);
  }

  async getBookingMemories(bookingId, userId) {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found.");
    }

    if (booking.guest._id.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized.");
    }

    return memoryRepository.findByBooking(bookingId);
  }

  async getMemory(memoryId, userId) {
    return this.getAuthorizedMemory(memoryId, userId);
  }

  async createMemory(bookingId, userId, body, files) {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found.");
    }

    if (booking.guest._id.toString() !== userId.toString()) {
      throw new ApiError(
        403,
        "You are not allowed to create a memory for this booking.",
      );
    }

    if (booking.bookingStatus !== "Completed") {
      throw new ApiError(
        400,
        "You can create memories only after completing your trip.",
      );
    }

    const alreadyExists = await memoryRepository.exists({
      booking: bookingId,
      user: userId,
    });

    if (alreadyExists) {
      throw new ApiError(400, "Memory already exists for this booking.");
    }

    if (!files || files.length === 0) {
      throw new ApiError(400, "Please upload at least one photo or video.");
    }

    const uploadedMedia = await uploadMemoryMedia(files);

    const memory = await memoryRepository.create({
      booking: booking._id,
      listing: booking.listing._id,
      user: booking.guest._id,
      title: body.title?.trim() || this.generateTitle(),
      caption: body.caption?.trim() || "",
      media: uploadedMedia,
    });

    return memoryRepository.findById(memory._id);
  }
  async updateMemory(memoryId, userId, body) {
    const memory = await this.getAuthorizedMemory(memoryId, userId);

    if (body.title !== undefined) {
      memory.title = body.title.trim();
    }

    if (body.caption !== undefined) {
      memory.caption = body.caption.trim();
    }

    await memoryRepository.save(memory);

    return memoryRepository.findById(memory._id);
  }

  async addMedia(memoryId, userId, files) {
    const memory = await this.getAuthorizedMemory(memoryId, userId);

    if (!files || files.length === 0) {
      throw new ApiError(400, "Please upload at least one photo or video.");
    }

    if (memory.media.length + files.length > 50) {
      throw new ApiError(400, "Maximum 50 media files allowed.");
    }

    const uploaded = await uploadMemoryMedia(files);

    memory.media.push(...uploaded);

    await memoryRepository.save(memory);

    return memoryRepository.findById(memory._id);
  }

  async deleteMedia(memoryId, mediaId, userId) {
    const memory = await this.getAuthorizedMemory(memoryId, userId);

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

    await memoryRepository.save(memory);

    return memoryRepository.findById(memory._id);
  }

  async updateCover(memoryId, mediaId, userId) {
    const memory = await this.getAuthorizedMemory(memoryId, userId);

    const exists = memory.media.some((item) => item._id.toString() === mediaId);

    if (!exists) {
      throw new ApiError(404, "Selected media not found.");
    }

    memory.coverMedia = mediaId;

    await memoryRepository.save(memory);

    return memoryRepository.findById(memory._id);
  }

  async deleteMemory(memoryId, userId) {
    const memory = await this.getAuthorizedMemory(memoryId, userId);

    await deleteMemoryMedia(memory.media);

    await memoryRepository.delete(memory._id);

    return true;
  }
}

export default new MemoryService();
