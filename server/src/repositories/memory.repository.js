import { Memory } from "../models/index.js";

class MemoryRepository {
  async create(data) {
    return Memory.create(data);
  }

  async find(filter = {}) {
    return Memory.find(filter)
      .populate({
        path: "listing",
        select: "title image city state currentPrice",
      })
      .populate({
        path: "booking",
      })
      .populate({
        path: "user",
        select: "fullName avatar",
      })
      .sort({
        createdAt: -1,
      });
  }

  async findOne(filter) {
    return Memory.findOne(filter)
      .populate("listing")
      .populate("booking")
      .populate("user", "fullName avatar");
  }

  async findById(id) {
    return Memory.findById(id)
      .populate("listing")
      .populate("booking")
      .populate("user", "fullName avatar");
  }

  async findByUser(userId) {
    return this.find({
      user: userId,
    });
  }

  async findByListing(listingId) {
    return this.find({
      listing: listingId,
    });
  }

  async findByBooking(bookingId) {
    return this.find({
      booking: bookingId,
    });
  }

  async update(id, data) {
    return Memory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return Memory.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return Memory.deleteMany(filter);
  }

  async exists(filter) {
    return Memory.exists(filter);
  }

  async count(filter = {}) {
    return Memory.countDocuments(filter);
  }
}

export default new MemoryRepository();
