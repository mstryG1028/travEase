import { Favorite } from "../models/index.js";

class FavoriteRepository {
  async create(data) {
    return Favorite.create(data);
  }

  async findOne(filter) {
    return Favorite.findOne(filter);
  }

  async find(filter) {
    return Favorite.find(filter).populate("listing").sort({
      createdAt: -1,
    });
  }

  async deleteOne(filter) {
    return Favorite.deleteOne(filter);
  }
}

export default new FavoriteRepository();
