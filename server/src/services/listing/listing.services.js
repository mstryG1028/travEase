import slugify from "slugify";
import listingRepository from "../../repositories/listing.repository.js";
import favoriteRepository from "../../repositories/favorite.repository.js";
import cleanupService from "../cleanup/cleanup.service.js";
import bookingRepository from "../../repositories/booking.repository.js";
import {
  Listing,
  ListingAnalytics,
  ListingPricing,
  ListingAI,
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
  // PREPARE LISTING DATA
  // ==========================
  async prepareListingData(body, file, ownerId) {
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

    let contactPerson = body.contactPerson;

    if (typeof contactPerson === "string") {
      contactPerson = JSON.parse(contactPerson);
    }

    const slug = `${slugify(body.title, {
      lower: true,
      strict: true,
    })}-${Date.now()}`;

    return {
      ...body,
      owner: ownerId,
      contactPerson,
      slug,
      image,
      views: 0,
      favorites: 0,
      trendingScore: 0,
    };
  }

  // ==========================
  // CREATE DEFAULT RESOURCES
  // ==========================
  async createListingResources(listing) {
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

    // Uncomment if ListingWeather exists
    /*
  await ListingWeather.create({
      listing: listing._id,
  });
  */
  }

  // ==========================
  // CREATE LISTING
  // ==========================
  async createListing(body, file, ownerId) {
    const listingData = await this.prepareListingData(body, file, ownerId);

    const listing = await listingRepository.create(listingData);

    await this.createListingResources(listing);

    return listing;
  }

  // ==========================
  // BECOME HOST (First Listing)
  // ==========================

  // ==========================
  // BECOME HOST
  // ==========================
  async createFirstListing(body, file, userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const listing = await this.createListing(body, file, userId);

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
    const resultPerPage = 16;

    const apiFeature = new ApiFeatures(
      Listing.find().populate("owner", "fullName avatar"),
      query,
    )
      .search()
      .filter()
      .sort()
      .pagination(resultPerPage);

    return await apiFeature.query;
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
    const hasBookings = await bookingRepository.hasActiveBookings(id);

    if (hasBookings) {
      throw new ApiError(
        400,
        `Listing cannot be deleted. Booking ${booking.bookingId} starts on ${booking.checkIn.toDateString()}.`,
      );
    }

    // Delete image from Cloudinary
    if (listing.image?.public_id) {
      await deleteFromCloudinary(listing.image.public_id);
    }

    // Delete all related data
    const activeBooking = await bookingRepository.findActiveBooking(id);

    if (activeBooking) {
      throw new ApiError(
        409,
        `This listing cannot be deleted because booking ${activeBooking.bookingId} for ${activeBooking.guest.fullName} is still active. Please wait until the booking is completed or cancel the booking first.`,
      );
    }

    await cleanupService.deleteListingRelations(listing);
    // Finally delete listing
    await listing.deleteOne();

    return true;
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
  async findActiveBooking(listingId) {
    return await Booking.findOne({
      listing: listingId,
      bookingStatus: {
        $in: ["Pending", "Confirmed"],
      },
      checkOut: {
        $gte: new Date(),
      },
    })
      .select("bookingId checkIn checkOut guest")
      .populate("guest", "fullName");
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
