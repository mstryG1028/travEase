import listingRepository from "../../../repositories/listing.repository.js";
import { success, failure } from "../ai.helper.js";

class PricingTool {
  async execute({ listingId }) {
    console.log("========== PRICING TOOL ==========");

    try {
      const listing = await listingRepository.findById(listingId);

      if (!listing) {
        return failure("pricing", "Listing not found.");
      }

      const { title, basePrice, currentPrice, currency } = listing;

      if (!basePrice || !currentPrice) {
        return failure(
          "pricing",
          "Pricing information is not available for this property.",
        );
      }

      return success(
        "pricing",

        `The price of ${title} is ${currentPrice} ${currency} per night. Original price was ${basePrice} ${currency}.`,

        {
          title,

          currency,

          pricing: {
            basePrice,

            currentPrice,
          },
        },
      );
    } catch (err) {
      console.error("PRICING TOOL ERROR", err);

      return failure(
        "pricing",
        "Pricing information is currently unavailable.",
      );
    }
  }
}

export default new PricingTool();
