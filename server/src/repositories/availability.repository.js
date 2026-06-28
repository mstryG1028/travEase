import { Availability } from "../models/index.js";

class AvailabilityRepository {
  async findByListing(listing) {
    return await Availability.findOne({
      listing,
    });
  }

  async create(data) {
    return await Availability.create(data);
  }

  async save(doc) {
    return await doc.save();
  }
}

export default new AvailabilityRepository();
