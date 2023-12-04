// app.js
const con = require('./db.js');
const cors = require('cors');
const { createUser, createUserTable } = require('./Models/user.js');
const { createPhotoTable } = require('./Models/photo.js') // Import the function
const express = require('express');
const userController = require('./Controller/userController');
const messagesController = require('./Controller/messagesController');
const photoController = require('./Controller/photoController');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', cors(), express.static('uploads'));

// Use the messages controller for handling messages from the client
app.use('/messages', messagesController);
app.use('/photos', photoController);

app.post('/users', userController.createUser);
app.post('/login', userController.loginUser);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
createUserTable();
createPhotoTable();

// Define some user data
// const userData = {
//   username: 'julius',
//   email: 'julius@htoamil.fr',
//   password: 'vebeyu55',
// };

// createUser(userData); // Call the function with the user data
