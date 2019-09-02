const DB = require("./DBconfig");

module.exports = {
  createUser,
  getUsers,
  findUser
};

function createUser(loginCreds) {
  return DB("users").insert(loginCreds);
}

function getUsers() {
  return DB("users");
}

function findUser(username) {
  return DB("users")
    .where({ username })
    .first();
}
