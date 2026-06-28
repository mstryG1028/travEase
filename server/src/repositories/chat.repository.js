import { Message } from "../models/index.js";

class MessageRepository {
  async create(data) {
    return await Message.create(data);
  }

  async find(query = {}) {
    return await Message.find(query)
      .populate("sender", "fullName avatar")
      .sort({ createdAt: 1 });
  }

  async updateMany(filter, data) {
    return await Message.updateMany(filter, data);
  }
}

export default new MessageRepository();
