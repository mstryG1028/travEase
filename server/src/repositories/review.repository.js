import { Review } from "../models/index.js";

class ReviewRepository {
  async create(data) {
    return await Review.create(data);
  }

  async find(query = {}) {
    return await Review.find(query).populate("user", "fullName avatar");
  }

  async findOne(query) {
    return await Review.findOne(query);
  }

  async delete(id) {
    return await Review.findByIdAndDelete(id);
  }
}

export default new ReviewRepository();
