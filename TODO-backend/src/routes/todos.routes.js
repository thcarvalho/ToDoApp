const express = require('express');
const routes = express.Router();

const TodoController = require('../controller/TodoController');

routes.get('/', TodoController.list)
routes.get('/:id', TodoController.show)
routes.post('/new', TodoController.add)
routes.delete('/:id/delete', TodoController.delete)
routes.put('/:id/update', TodoController.update)


module.exports = routes;