import { Favorite } from "../models/index.js";

class FavoriteRepository {
  async create(data) {
    return Favorite.create(data);
  }

  async find(filter = {}) {
    return Favorite.find(filter).populate("listing").sort({
      createdAt: -1,
    });
  }

  async findOne(filter) {
    return Favorite.findOne(filter);
  }

  async findById(id) {
    return Favorite.findById(id);
  }

  async update(id, data) {
    return Favorite.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return Favorite.findByIdAndDelete(id);
  }

  async deleteOne(filter) {
    return Favorite.deleteOne(filter);
  }

  async deleteMany(filter) {
    return Favorite.deleteMany(filter);
  }

  async exists(filter) {
    return Favorite.exists(filter);
  }

  async count(filter = {}) {
    return Favorite.countDocuments(filter);
  }

  async findByUser(userId) {
    return Favorite.find({
      user: userId,
    }).populate("listing");
  }
}

export default new FavoriteRepository();
