import { Achievement } from "../models/index.js";

class AchievementRepository {
  async create(data) {
    return await Achievement.create(data);
  }

  async find(query = {}) {
    return await Achievement.find(query)

      .sort({
        createdAt: -1,
      });
  }

  async exists(user, badge) {
    return await Achievement.findOne({
      user,

      badge,
    });
  }
}

export default new AchievementRepository();
