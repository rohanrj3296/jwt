// server1.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Route to authenticate and generate JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication check
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server1
app.listen(PORT, () => {
  console.log(`Server1 running on port ${PORT}`);
});
