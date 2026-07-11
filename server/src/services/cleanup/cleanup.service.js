import bookingRepository from "../../repositories/booking.repository.js";
import favoriteRepository from "../../repositories/favorite.repository.js";
import reviewRepository from "../../repositories/review.repository.js";
import memoryRepository from "../../repositories/memory.repository.js";

import {
  ListingAnalytics,
  ListingPricing,
  ListingAI,
} from "../../models/index.js";

import { deleteFromCloudinary } from "../../utils/cloudinary.js";

class CleanupService {
  async deleteListingRelations(listing) {
    const listingId = listing._id;

    // Favorites
    await favoriteRepository.deleteMany({
      listing: listingId,
    });

    // Reviews
    await reviewRepository.deleteMany({
      listing: listingId,
    });

    // Memories
    const memories = await memoryRepository.findByListing(listingId);

    for (const memory of memories) {
      for (const media of memory.media) {
        if (media.public_id) {
          await deleteFromCloudinary(media.public_id);
        }
      }

      if (memory.aiCollage?.public_id) {
        await deleteFromCloudinary(memory.aiCollage.public_id);
      }
    }

    await memoryRepository.deleteMany({
      listing: listingId,
    });

    // Booking Safety
    await bookingRepository.deleteMany({
      listing: listingId,
      bookingStatus: {
        $in: ["Cancelled"],
      },
    });

    // Analytics
    await ListingAnalytics.deleteOne({
      listing: listingId,
    });

    // Pricing
    await ListingPricing.deleteOne({
      listing: listingId,
    });

    // AI
    await ListingAI.deleteOne({
      listing: listingId,
    });
  }
}

export default new CleanupService();
