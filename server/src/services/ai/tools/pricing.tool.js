import { Listing } from "../../../models/index.js";

class PricingTool {
  async execute({ listing }) {
    const listings = await Listing.find({
      city: listing.city,
      propertyType: listing.propertyType,
    }).select("currentPrice");

    const average =
      listings.reduce((sum, item) => sum + item.currentPrice, 0) /
      (listings.length || 1);

    return {
      currentPrice: listing.currentPrice,
      averageCityPrice: Math.round(average),
      difference: listing.currentPrice - Math.round(average),
    };
  }
}

export default new PricingTool();
