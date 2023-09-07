// userController.js
const con = require('../db.js');

exports.createUser = (req, res) => {
  const { username, email, password, fullName, age } = req.body;
  const sql = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${password}')`;

  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(201).send({ message: "User created successfully" });
    }
  });
};
