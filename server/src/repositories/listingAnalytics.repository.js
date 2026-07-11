import { ListingAnalytics } from "../models/index.js";

class ListingAnalyticsRepository {
  async create(data) {
    return ListingAnalytics.create(data);
  }

  async find(filter = {}) {
    return ListingAnalytics.find(filter);
  }

  async findOne(filter) {
    return ListingAnalytics.findOne(filter);
  }

  async findById(id) {
    return ListingAnalytics.findById(id);
  }

  async update(id, data) {
    return ListingAnalytics.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return ListingAnalytics.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return ListingAnalytics.deleteMany(filter);
  }

  async exists(filter) {
    return ListingAnalytics.exists(filter);
  }

  async count(filter = {}) {
    return ListingAnalytics.countDocuments(filter);
  }
}

export default new ListingAnalyticsRepository();
