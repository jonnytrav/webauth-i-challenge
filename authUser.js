const DB = require("./DBhelpers");
const bcrypt = require("bcryptjs");

module.exports = function verify(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    DB.findUser(username).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    });
  } else {
    res.status(400).json({ message: "Please provide needed credentials." });
  }
};
