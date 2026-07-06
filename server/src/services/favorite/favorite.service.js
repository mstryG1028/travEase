import favoriteRepository from "../../repositories/favorite.repository.js";
import listingRepository from "../../repositories/listing.repository.js";

import listingService from "../listing/listing.services.js";

import ApiError from "../../utils/ApiError.js";

class FavoriteService {
  async addFavorite(userId, listingId) {
    const listing = await listingRepository.findById(listingId);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    const alreadyExists = await favoriteRepository.findOne({
      user: userId,
      listing: listingId,
    });

    if (alreadyExists) {
      throw new ApiError(400, "Already in wishlist");
    }

    const favorite = await favoriteRepository.create({
      user: userId,
      listing: listingId,
    });

    await listingService.updateFavorites(listingId, "add");

    return favorite;
  }

  async getWishlist(userId) {
    return favoriteRepository.find({
      user: userId,
    });
  }

  async removeFavorite(userId, listingId) {
    const favorite = await favoriteRepository.findOne({
      user: userId,
      listing: listingId,
    });

    if (!favorite) {
      throw new ApiError(404, "Favorite not found");
    }

    await favoriteRepository.deleteOne({
      user: userId,
      listing: listingId,
    });

    await listingService.updateFavorites(listingId, "remove");

    return true;
  }
}

export default new FavoriteService();
