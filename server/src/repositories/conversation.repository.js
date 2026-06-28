
class ConversationRepository {
  async create(data) {
    return await Conversation.create(data);
  }

  async findByBooking(booking) {
    return await Conversation.findOne({ booking });
  }

  // async findById(id) {
  //   return await Conversation.findById(id);
  // }
  async findOne(id) {
    return await Conversation.findOne(id);
  }

  async find(query = {}) {
    return await Conversation.find(query)
      .populate("guest", "fullName avatar")
      .populate("owner", "fullName avatar")
      .sort({ lastMessageAt: -1 });
  }

  async save(doc) {
    return await doc.save();
  }
}

export default new ConversationRepository();
