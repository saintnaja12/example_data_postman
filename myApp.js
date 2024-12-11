const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 8080;

// Middleware to parse JSON
app.use(express.json());

// In-memory data storage
let users = [];

// Create - POST /users
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read All - GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// Read One - GET /users/:id
app.get('/users/:id', (req, res) => {
  console.log("🚀 ~ app.get ~ req:", req)
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Update - PUT /users/:id
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  users[userIndex] = { id: req.params.id, name, email };
  res.json(users[userIndex]);
});

// Delete - DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
