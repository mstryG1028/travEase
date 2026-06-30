import { Chat } from "../models/index.js";

class ChatRepository {
  async create(data) {
    return await Chat.create(data);
  }

  async find(query = {}) {
    return await Chat.find(query)
      .populate("guest", "fullName avatar")
      .populate("owner", "fullName avatar")
      .populate("listing", "title image")
      .sort({ lastMessageAt: -1 });
  }

  async findById(id) {
    return await Chat.findById(id)
      .populate("guest", "fullName avatar")
      .populate("owner", "fullName avatar")
      .populate("listing", "title image");
  }

  async findByBooking(bookingId) {
    return await Chat.findOne({
      booking: bookingId,
    });
  }

  async save(chat) {
    return await chat.save();
  }
}

export default new ChatRepository();
