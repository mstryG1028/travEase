import { Review } from "../models/index.js";

class ReviewRepository {
  async create(data) {
    return Review.create(data);
  }

  async find(filter = {}) {
    return Review.find(filter)
      .populate("user", "fullName avatar")
      .sort({
        createdAt: -1,
      });
  }

  async findOne(filter) {
    return Review.findOne(filter).populate(
      "user",
      "fullName avatar",
    );
  }

  async findById(id) {
    return Review.findById(id).populate(
      "user",
      "fullName avatar",
    );
  }

  async update(id, data) {
    return Review.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return Review.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return Review.deleteMany(filter);
  }

  async exists(filter) {
    return Review.exists(filter);
  }

  async count(filter = {}) {
    return Review.countDocuments(filter);
  }
}

export default new ReviewRepository();