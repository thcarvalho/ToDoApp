const express = require('express');
const routes = express.Router();

const TodoController = require('../controller/TodoController');

routes.get('/:user/', TodoController.list)
routes.get('/:user/:id', TodoController.show)
routes.post('/:user/new', TodoController.add)
routes.delete('/:user/:id/delete', TodoController.delete)
routes.put('/:user/:id/update', TodoController.update)


module.exports = routes;