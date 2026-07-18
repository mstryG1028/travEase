import listingRepository from "../../../repositories/listing.repository.js";
import { success, failure } from "../ai.helper.js";

class AmenitiesTool {
  async execute({ listingId }) {
    try {
      const listing = await listingRepository.findById(listingId);

      if (!listing) {
        return failure("amenities", "Listing not found.");
      }

      const amenities = listing.amenities || [];

      const message =
        amenities.length > 0
          ? `This property offers ${amenities.join(", ")}.`
          : "No amenities information is available.";

      return success("amenities", message, {
        title: listing.title,
        amenities,
      });
    } catch (err) {
      
      return failure(
        "amenities",
        "Amenities information is currently unavailable.",
      );
    }
  }
}

export default new AmenitiesTool();
