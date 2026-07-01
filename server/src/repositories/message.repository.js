import { Message } from "../models/index.js";

class MessageRepository {
  async create(data) {
    return await Message.create(data);
  }

  async find(query = {}) {
    return await Message.find(query)
      .populate("sender", "fullName avatar")
      .populate("receiver", "fullName avatar")
      .sort({
        createdAt: 1,
      });
  }

  async findById(id) {
    return await Message.findById(id);
  }

  async updateMany(filter, update) {
    return await Message.updateMany(filter, update);
  }

  async delete(message) {
    return await message.deleteOne();
  }
}

export default new MessageRepository();
