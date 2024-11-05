const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 3002;

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Extract the token part after 'Bearer '
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Store the decoded user in the request object
    next();
  });
};

// Route to test token verification
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access to this route!` });
});

// Start server2
app.listen(PORT, () => {
  console.log(`Server2 running on port ${PORT}`);
});
