const con = require('./db.js');

const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      fullName VARCHAR(255),
      age INT
    )
  `;

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("User table created successfully");
  });
};

const createUser = (userData) => {
  const { username, email, password, fullName, age } = userData;
  const sql = `INSERT INTO user (username, email, password, fullName, age) VALUES ('${username}', '${email}', '${password}', '${fullName}', ${age})`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("User created successfully");
  });
};

module.exports = {
  createUserTable,
  createUser
};
