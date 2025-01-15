const express = require('express');
const usersController = require('../controllers/users.controller');
const userRoutes = express.Router();

userRoutes.get('/', usersController.getAllUsers);
userRoutes.get('/:id', usersController.getUserById);
userRoutes.delete('/:id', usersController.deleteUser);

module.exports = userRoutes;
