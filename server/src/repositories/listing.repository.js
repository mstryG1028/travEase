import { Listing } from "../models/index.js";

class ListingRepository {
  async create(data) {
    return await Listing.create(data);
  }

  async findById(id) {
    return await Listing.findById(id).populate(
      "owner",
      "fullName avatar email",
    );
  }

  async find(query = {}) {
    return await Listing.find(query).populate("owner", "fullName avatar");
  }
  async findByOwner(ownerId) {
    return await Listing.find({ owner: ownerId })
      .populate("owner", "fullName avatar")
      .sort({ createdAt: -1 });
  }

  async update(id, data) {
    return await Listing.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }
  async search(keyword) {
    return await Listing.find({
      $text: {
        $search: keyword,
      },
    });
  }

  async delete(id) {
    return await Listing.findByIdAndDelete(id);
  }

  async save(document) {
    return await document.save();
  }

  async findNearby(
    longitude,

    latitude,

    distance = 5000,
  ) {
    return await Listing.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [longitude, latitude],
          },

          $maxDistance: distance,
        },
      },
    });
  }
}

export default new ListingRepository();
