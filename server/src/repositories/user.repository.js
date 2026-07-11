import { User } from "../models/index.js";

class UserRepository {
  create(data) {
    return User.create(data);
  }

  find(query = {}) {
    return User.find(query);
  }

  findOne(query) {
    return User.findOne(query);
  }

  findById(id) {
    return User.findById(id);
  }

  update(id, data, options = {}) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      ...options,
    });
  }

  save(user) {
    return user.save();
  }

  delete(id) {
    return User.findByIdAndDelete(id);
  }

  exists(query) {
    return User.exists(query);
  }

  count(query = {}) {
    return User.countDocuments(query);
  }
}

export default new UserRepository();
