import { Notification } from "../models/index.js";

class NotificationRepository {
  async create(data) {
    return await Notification.create(data);
  }

  async find(query = {}) {
    return await Notification.find(query)

      .sort({
        createdAt: -1,
      });
  }

  async findById(id) {
    return await Notification.findById(id);
  }

  async save(doc) {
    return await doc.save();
  }

  async delete(id) {
    return await Notification.findByIdAndDelete(id);
  }

  async updateMany(filter, data) {
    return await Notification.updateMany(
      filter,

      data,
    );
  }
}

export default new NotificationRepository();
