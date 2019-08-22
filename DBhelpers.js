const DB = require("./DBconfig");

module.exports = {
  createUser,
  getUsers
};

function createUser(loginCreds) {
  return DB("users").insert(loginCreds);
}

function getUsers() {
  return DB("users");
}
