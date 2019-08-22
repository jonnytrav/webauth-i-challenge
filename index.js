const express = require("express");
const bcrypt = require("bcryptjs");
const userDB = require("./DBhelpers");
const verify = require("./authUser");

const server = express();

server.use(express.json());

server.post("/users", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  try {
    const newUser = await userDB.createUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

server.get("/users", verify, async (req, res) => {
  try {
    const users = await userDB.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
