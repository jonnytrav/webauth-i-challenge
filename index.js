const express = require("express");
const bcrypt = require("bcryptjs");
const userDB = require("./DBhelpers");
const verify = require("./authUser");
const session = require("express-sessions");

const sessionConfig = {
  name: "monkeys",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, //unless in production
    httpOnly: true // can configure  HTTPS later. JS cannot access
  },
  resave: false,
  saveUninitialized: true // GDPR laws against autosetting cookies unless opted in. CHANGE DURING PRODUCTION
};

const server = express();

server.use(express.json());
server.use(session(sessionConfig));

server.post("/users/register", async (req, res) => {
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

server.post("/users/login", (req, res) => {
  const userInfo = req.body;

  userDB
    .findUser(userInfo.username)
    .then(response => {
      if (!response) {
        res.status(404).json({
          message:
            "No account associated with that username. Check your spelling."
        });
      } else {
        if (bcrypt.compareSync(userInfo.password, response.password)) {
          res
            .status(200)
            .json({ success: true, message: `Welcome, ${userInfo.username}` });
        }
      }
    })
    .catch(err => {
      res.status(400).json({ success: false, message: err.message });
    });
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
