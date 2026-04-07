const db = require("../database/fakeDB");
const User = require("../models/User");

class UserController {
  createUser(data) {
    const user = new User(data);
    db.users.set(user.id, user);
    return user;
  }

  getUser(id) {
    return db.users.get(id);
  }
}

module.exports = UserController;