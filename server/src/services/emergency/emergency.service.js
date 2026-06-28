import axios from "axios";

import { Listing } from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

const SEARCH_RADIUS = 5000;

// =========================================
// Search Nearby Places
// =========================================
async function searchNearby(latitude, longitude, type) {
  try {
    const { data } = await axios.get(BASE_URL, {
      timeout: 5000,

      params: {
        location: `${latitude},${longitude}`,

        radius: SEARCH_RADIUS,

        type,

        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(data.status);
    }

    if (data.status === "ZERO_RESULTS") {
      return [];
    }

    return data.results.map((place) => ({
      name: place.name,

      address: place.vicinity,

      location: place.geometry.location,

      rating: place.rating || null,

      totalRatings: place.user_ratings_total || 0,
    }));
  } catch (error) {
    throw new ApiError(500, `Unable to fetch nearby ${type}`);
  }
}

// =========================================
// Get Emergency Contacts
// =========================================
export async function getEmergencyContacts(listingId) {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new ApiError(500, "Google Maps API Key is missing");
  }

  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  let latitude;
  let longitude;

  // GeoJSON
  if (
    listing.location?.coordinates &&
    listing.location.coordinates.length === 2
  ) {
    longitude = listing.location.coordinates[0];
    latitude = listing.location.coordinates[1];
  }

  // latitude/longitude object
  else if (listing.location?.latitude && listing.location?.longitude) {
    latitude = listing.location.latitude;
    longitude = listing.location.longitude;
  } else {
    throw new ApiError(400, "Invalid listing location");
  }

  const [hospitals, policeStations, pharmacies, fireStations] =
    await Promise.all([
      searchNearby(latitude, longitude, "hospital"),

      searchNearby(latitude, longitude, "police"),

      searchNearby(latitude, longitude, "pharmacy"),

      searchNearby(latitude, longitude, "fire_station"),
    ]);

  return {
    hospitals,

    policeStations,

    pharmacies,

    fireStations,
  };
}
