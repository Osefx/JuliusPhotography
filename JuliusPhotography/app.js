// app.js
const con = require('./Models/db.js');
const { createUser, createUserTable } = require('./Models/user.js'); // Import the function

createUserTable();

// Define some user data
const userData = {
  username: 'julius',
  email: 'julius@htoamil.fr',
  password: 'vebeyu55',
  fullName: 'Julien Piscopo',
  age: 25
};

createUser(userData); // Call the function with the user data
