const fs = require('fs');
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });
    return res.json(JSON.parse(data));
  });
};

usersController.getUserById = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (error, data) => {
    if (error) return res.status(500).json({ error: 'Error reading user file' });
    const userFound = JSON.parse(data).find(user => user.userId === id);
    if (!userFound) return res.status(404).json({ error: 'User not found' });
    return res.json(userFound);
  });
};

usersController.updateUser = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Not id' });
  const newUserInfo = req.body;
  console.log(newUserInfo);
  if (!newUserInfo) return res.status(400).json({ error: 'Not user data' });
  fs.readFile(usersFile, (error, data) => {
    if (error) return res.status(500).json({ error: 'Error reading user file' });
    const jsonUsers = JSON.parse(data);
    const userFoundIndex = jsonUsers.findIndex(user => user.userId === id);
    if (userFoundIndex === -1) return res.status(404).json({ error: 'User not found' });

    jsonUsers[userFoundIndex] = { ...jsonUsers[userFoundIndex], ...newUserInfo };

    fs.writeFile(usersFile, JSON.stringify(jsonUsers), error => {
      if (error) return res.status(500).json({ error: 'Error writing user file' });
      return res.status(200).json(jsonUsers[userFoundIndex]);
    });
  });
};

usersController.deleteUser = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (error, data) => {
    if (error) return res.status(500).json({ error: 'Error reading user file' });
    const jsonUsers = JSON.parse(data);
    const userToDelete = jsonUsers.find(user => user.userId === id);
    if (!userToDelete) return res.status(404).json({ error: 'User not found' });
    const usersUpdated = jsonUsers.filter(user => user.userId !== id);
    fs.writeFile(usersFile, JSON.stringify(usersUpdated), error => {
      if (error) return res.status(500).json({ error: 'Error writing user file' });
    });
    return res.json(usersUpdated);
  });
};

module.exports = usersController;
