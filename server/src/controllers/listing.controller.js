import listingService from "../services/listing/listing.services.js";


import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const getMyListings = AsyncHandler(async (req, res) => {
  const listings = await listingService.getMyListings(req.user._id);

  return sendResponse(res, 200, listings);
});

export const createListing = AsyncHandler(async (req, res) => {
  const listing = await listingService.createListing(
    req.body,

    req.file,

    req.user._id,
  );

  return sendResponse(
    res,

    201,

    listing,

    "Listing Created",
  );
});

export const createFirstListing = AsyncHandler(async (req, res) => {
  const listing = await listingService.createFirstListing(
    req.body,
    req.file,
    req.user._id,
  );

  return sendResponse(
    res,
    201,
    listing,
    "Congratulations! You are now a host.",
  );
});

export const getAllListings = AsyncHandler(async (req, res) => {
  const listings = await listingService.getAllListings(req.query);

  return sendResponse(
    res,

    200,

    listings,
  );
});

export const getSingleListing = AsyncHandler(async (req, res) => {
  const listing = await listingService.getListing(req.params.id);

  return sendResponse(
    res,

    200,

    listing,
  );
});

export const updateListing = AsyncHandler(async (req, res) => {
  const listing = await listingService.updateListing(
    req.params.id,

    req.user._id,

    req.body,
    req.file,
  );

  return sendResponse(
    res,

    200,

    listing,

    "Listing Updated",
  );
});

export const deleteListing = AsyncHandler(async (req, res) => {
  await listingService.deleteListing(
    req.params.id,

    req.user._id,
  );

  return sendResponse(
    res,

    200,

    null,

    "Listing Deleted",
  );
});

export const nearbyListings = AsyncHandler(async (req, res) => {
  const {
    longitude,

    latitude,

    distance,
  } = req.query;

  const listings = await listingService.nearbyListings(
    Number(longitude),

    Number(latitude),

    Number(distance) || 5000,
  );

  return sendResponse(
    res,

    200,

    listings,
  );
});

export const incrementViews = AsyncHandler(async (req, res) => {
  const views = await listingService.incrementViews(req.params.id);

  return sendResponse(
    res,

    200,

    views,
  );
});

export const updateFavorites = AsyncHandler(async (req, res) => {
  const listing = await listingService.updateFavorites(
    req.params.id,

    req.body.type,
  );

  return sendResponse(
    res,

    200,

    listing,
  );
});
