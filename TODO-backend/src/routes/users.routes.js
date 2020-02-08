const express = require('express');
const routes = express.Router(); 

const UserController = require('../controller/UserController');

routes.post('/users/add', UserController.signup);
routes.post('/users/login', UserController.login);
routes.get('/users', UserController.show);
routes.get('/users/:id', UserController.find);
routes.put('/users/:id/update', UserController.update);
routes.get('/users/:id/verifypassword', UserController.verifyPassword);
routes.put('/users/:id/updatepassword', UserController.updatePassword);

module.exports = routes;
