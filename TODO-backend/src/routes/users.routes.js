const express = require('express');
const routes = express.Router(); 

const UserController = require('../controller/UserController');

routes.post('/users/add', UserController.signup)
routes.post('/users/login', UserController.login)
routes.get('/users', UserController.show)

module.exports = routes;
