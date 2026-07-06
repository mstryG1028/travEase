import slugify from "slugify";
import listingRepository from "../../repositories/listing.repository.js";

import {
  Listing,
  ListingAnalytics,
  ListingPricing,
  ListingAI,
  ListingWeather,
  User,
} from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinary.js";

class ListingService {
  // ==========================
  // CREATE LISTING
  // ==========================
  async createListing(body, file, ownerId) {
    let image = null;

    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (uploaded) {
        image = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }
    }

    // Generate unique slug
    const slug = `${slugify(body.title, {
      lower: true,
      strict: true,
    })}-${Date.now()}`;

    let contactPerson = body.contactPerson;

    if (typeof contactPerson === "string") {
      contactPerson = JSON.parse(contactPerson);
    }

    const listing = await listingRepository.create({
      ...body,
      contactPerson,
      owner: ownerId,
      slug,
      image,
      views: 0,
      favorites: 0,
      trendingScore: 0,
    });

    // Create Analytics
    await ListingAnalytics.create({
      listing: listing._id,
    });

    // Create Pricing
    await ListingPricing.create({
      listing: listing._id,
      basePrice: listing.basePrice,
      currentPrice: listing.currentPrice,
    });

    // Create AI
    await ListingAI.create({
      listing: listing._id,
    });

    // Create Weather
    await ListingWeather.create({
      listing: listing._id,
    });

    return listing;
  }
  // ==========================
  // BECOME HOST (First Listing)
  // ==========================
  async createFirstListing(body, file, userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    let image = null;

    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);

      if (uploaded) {
        image = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }
    }

    const slug = `${slugify(body.title, {
      lower: true,
      strict: true,
    })}-${Date.now()}`;

    let contactPerson = body.contactPerson;

    if (typeof contactPerson === "string") {
      contactPerson = JSON.parse(contactPerson);
    }

    const listing = await listingRepository.create({
      ...body,
      contactPerson,
      owner: userId,
      slug,
      image,
      views: 0,
      favorites: 0,
      trendingScore: 0,
    });

    await ListingAnalytics.create({
      listing: listing._id,
    });

    await ListingPricing.create({
      listing: listing._id,
      basePrice: listing.basePrice,
      currentPrice: listing.currentPrice,
    });

    await ListingAI.create({
      listing: listing._id,
    });

    await ListingWeather.create({
      listing: listing._id,
    });

    if (user.role === "user") {
      user.role = "owner";
      await user.save();
    }

    return listing;
  }

  // ==========================
  // GET ALL LISTINGS
  // ==========================
  async getAllListings(query) {
    const resultPerPage = 8;

    const apiFeature = new ApiFeatures(
      Listing.find().populate("owner", "fullName avatar"),
      query,
    )
      .search()
      .filter()
      .pagination(resultPerPage);

    return await apiFeature.query;
  }

  // ==========================
  // GET MY LISTING
  // ==========================
  async getMyListings(ownerId) {
    return await Listing.find({ owner: ownerId })
      .populate("owner", "fullName avatar")
      .sort({ createdAt: -1 });
  }

  // ==========================
  // GET SINGLE LISTING
  // ==========================
  async getListing(id) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new ApiError(404, "Listing Not Found");
    }

    // Increase view count
    listing.views += 1;

    await listing.save();

    return listing;
  }

  // ==========================
  // MY LISTINGS
  // ==========================

  async getMyListings(userId) {
    return await listingRepository.findByOwner(userId);
  }

  // ==========================
  // UPDATE LISTING
  // ==========================
  async updateListing(id, userId, data, file) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new ApiError(404, "Listing Not Found");
    }

    if (listing.owner._id.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized");
    }

    if (typeof data.contactPerson === "string") {
      data.contactPerson = JSON.parse(data.contactPerson);
    }

    if (data.title && data.title !== listing.title) {
      data.slug = `${slugify(data.title, {
        lower: true,
        strict: true,
      })}-${Date.now()}`;
    }

    if (file) {
      if (listing.image?.public_id) {
        await deleteFromCloudinary(listing.image.public_id);
      }

      const uploaded = await uploadOnCloudinary(file.path);

      listing.image = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    }

    Object.assign(listing, data);

    await listing.save();

    return listing;
  }

  // ==========================
  // DELETE LISTING
  // ==========================
  async deleteListing(id, userId) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new ApiError(404, "Listing Not Found");
    }

    if (listing.owner._id.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized");
    }

    if (listing.image?.public_id) {
      await deleteFromCloudinary(listing.image.public_id);
    }

    await ListingAnalytics.deleteOne({
      listing: listing._id,
    });

    await ListingPricing.deleteOne({
      listing: listing._id,
    });

    await ListingAI.deleteOne({
      listing: listing._id,
    });

    await ListingWeather.deleteOne({
      listing: listing._id,
    });

    await listing.deleteOne();
  }

  // ===================================
  // Increment Views
  // ===================================

  async incrementViews(id) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new ApiError(
        404,

        "Listing not found",
      );
    }

    listing.views++;

    await listingRepository.save(listing);

    return listing.views;
  }

  async updateFavorites(
    id,

    type,
  ) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new ApiError(
        404,

        "Listing not found",
      );
    }

    if (type === "add") {
      listing.favorites++;
    } else {
      listing.favorites = Math.max(
        0,

        listing.favorites - 1,
      );
    }

    await listingRepository.save(listing);

    return listing;
  }

  // ==========================
  // Calculate Trending
  // ==========================
  async calculateTrending(listingId) {
    const listing = await listingRepository.findById(listingId);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    const analytics = await ListingAnalytics.findOne({
      listing: listingId,
    });

    const totalBookings = analytics?.totalBookings || 0;

    const score =
      listing.views * 0.2 +
      listing.favorites * 0.3 +
      listing.averageRating * 30 +
      totalBookings * 10;

    listing.trendingScore = Math.round(score);

    await listing.save();

    return listing.trendingScore;
  }
  // ==========================
  // Trending LISTINGS
  // ==========================
  async trendingListings() {
    return await Listing.find()
      .populate("owner", "fullName avatar")
      .sort({
        trendingScore: -1,
      })
      .limit(10);
  }

  // ==========================
  // NEARBY LISTINGS
  // ==========================

  async nearbyListings(
    longitude,

    latitude,

    distance,
  ) {
    return await listingRepository.findNearby(
      longitude,

      latitude,

      distance,
    );
  }
}

export default new ListingService();
