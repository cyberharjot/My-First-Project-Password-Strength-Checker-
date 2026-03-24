const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users.json', express.static(path.join(__dirname, 'users.json')));

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  users.push({ username, password });
  saveUsers(users);
  res.json({ message: 'Signup successful!' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: `Welcome, ${username}` });
});

app.get('/api/users', (req, res) => {
  const users = loadUsers();
  res.json(users.map(u => u.username));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});