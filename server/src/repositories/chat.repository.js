import { Chat } from "../models/index.js";

class ChatRepository {
  async create(data) {
    return Chat.create(data);
  }

  async find(filter = {}) {
    return Chat.find(filter);
  }

  async findOne(filter) {
    return Chat.findOne(filter);
  }

  async findById(id) {
    return Chat.findById(id);
  }

  async update(id, data) {
    return Chat.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async save(doc) {
    return doc.save();
  }

  async delete(id) {
    return Chat.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return Chat.deleteMany(filter);
  }

  async exists(filter) {
    return Chat.exists(filter);
  }

  async count(filter = {}) {
    return Chat.countDocuments(filter);
  }
}

export default new ChatRepository();
