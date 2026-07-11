import { Listing } from "../models/index.js";

class ListingRepository {
  async create(data) {
    return Listing.create(data);
  }

  async find(filter = {}) {
    return Listing.find(filter).populate("owner", "fullName avatar");
  }

  async findOne(filter) {
    return Listing.findOne(filter).populate("owner", "fullName avatar email");
  }

  async findById(id) {
    return Listing.findById(id).populate("owner", "fullName avatar email");
  }

  async findByOwner(ownerId) {
    return Listing.find({
      owner: ownerId,
    })
      .populate("owner", "fullName avatar")
      .sort({
        createdAt: -1,
      });
  }

  async update(id, data) {
    return Listing.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return Listing.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return Listing.deleteMany(filter);
  }

  async save(doc) {
    return doc.save();
  }

  async exists(filter) {
    return Listing.exists(filter);
  }

  async count(filter = {}) {
    return Listing.countDocuments(filter);
  }

  async search(keyword) {
    return Listing.find({
      $text: {
        $search: keyword,
      },
    });
  }

  async findNearby(longitude, latitude, distance = 5000) {
    return Listing.find({
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
