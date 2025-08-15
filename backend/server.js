import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import jwt from 'jsonwebtoken';

import User from './models/User.js'; // Imports the default export object

dotenv.config();

//just to test the JWT functionality
// const testToken = jwt.sign({ id: 'user1', name: 'Test User' }, process.env.JWT_SECRET);
// console.log('Test Token:', testToken);

(async () => {
  await connectDB();
})();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

app.get('/protected', (req, res) => {
    //below, i am commenting out all the unused console logs to make the code more cleaner
  // console.log('Received /protected request');
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log('Token:', token);
  if (!token) {
    // console.log('No token provided');
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Token verified, decoded:', decoded);
    res.json({ message: 'Protected data', user: decoded });
  } catch (error) {
    // console.log('Token verification error:', error.message);
    res.status(400).send('Invalid token.');
  }
});



// User Routes
app.post('/users', User.createUser);
app.get('/users', User.getUsers);
app.put('/users/:id', User.updateUser);
app.delete('/users/:id', User.deleteUser);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
