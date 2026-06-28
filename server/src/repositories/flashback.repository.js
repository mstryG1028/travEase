import { Flashback } from "../models/index.js";

class FlashbackRepository {
  async create(data) {
    return await Flashback.create(data);
  }

  async find(query = {}) {
    return await Flashback.find(query)

      .populate(
        "user",

        "fullName avatar",
      )

      .sort({
        createdAt: -1,
      });
  }

  async findById(id) {
    return await Flashback.findById(id);
  }

  async save(doc) {
    return await doc.save();
  }

  async delete(id) {
    return await Flashback.findByIdAndDelete(id);
  }
}

export default new FlashbackRepository();
