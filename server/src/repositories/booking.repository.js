import { Booking } from "../models/index.js";

class BookingRepository {
  async create(data, session = null) {
    return await Booking.create([data], { session }).then((res) => res[0]);
  }

  async find(query = {}) {
    return await Booking.find(query)
      .populate("listing")
      .populate("guest", "fullName email avatar")
      .populate("owner", "fullName email avatar")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Booking.findById(id)
      .populate("listing")
      .populate("guest")
      .populate("owner");
  }

  async exists(query) {
    return await Booking.exists(query);
  }

  async count(query = {}) {
    return await Booking.countDocuments(query);
  }

  async aggregate(pipeline) {
    return await Booking.aggregate(pipeline);
  }

  async save(doc) {
    return await doc.save();
  }

  async delete(id) {
    return await Booking.findByIdAndDelete(id);
  }

  async update(id, data) {
    return await Booking.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default new BookingRepository();
