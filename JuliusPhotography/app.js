// app.js
const con = require('./db.js');
const { createUser, createUserTable } = require('./Models/user.js'); // Import the function
const express = require('express');
const userController = require('./Controller/userController');
const app = express();

app.use(express.json());

app.post('/users', userController.createUser);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
createUserTable();

// Define some user data
const userData = {
  username: 'julius',
  email: 'julius@htoamil.fr',
  password: 'vebeyu55',
};

// createUser(userData); // Call the function with the user data
