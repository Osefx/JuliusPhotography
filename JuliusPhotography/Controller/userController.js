// userController.js
const con = require('../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = (req, res) => {
  const { username, email, password, fullName, age } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const sql = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

      con.query(sql, (err, result) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          console.log("User created successfully");
          res.status(201).send({ message: "User created successfully" });
        }
      });
    }
  });
};      
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM user WHERE username = '${username}'`;

  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else if (result.length > 0) {
      const user = result[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else if (isMatch) {
          res.status(200).send({ message: "Login successful" });
        } else {
          res.status(401).send({ message: "Invalid username or password" });
        }
      });
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  });
};