const fs = require('fs');
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });
    res.json(JSON.parse(data));
  });
};

usersController.getUserById = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file' });
    const userFound = JSON.parse(data).find(user => user.userId === id);
    if (!userFound) return res.status(404).json({ error: 'User not found' });
    return res.json(userFound);
  });
};

usersController.deleteUser = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file' });
    const jsonUsers = JSON.parse(data);
    const userToDelete = jsonUsers.find(user => user.userId === id);
    if (!userToDelete) return res.status(404).json({ error: 'User not found' });
    const usersUpdated = jsonUsers.filter(user => user.userId !== id);
    return res.json(usersUpdated);
  });
};

module.exports = usersController;
