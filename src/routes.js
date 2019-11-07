const express = require("express");
const routes = express.Router();
const personController =  require("./controllers/PersonController");
const projectController =  require("./controllers/projectController");

// Fazer integração com o bd e os controllers
routes.get('/users', personController.index)//
routes.post('/user/register', personController.register);
routes.post('/login', personController.login );
routes.post('/user/:clickedUser', personController.search)
routes.put('/user/edit', personController.edit);
routes.delete('/:user/delete', personController.delete);

routes.get('/projects', projectController.index);
routes.post('/project/add', projectController.register);
routes.put('/project/edit', projectController.edit);
routes.delete('/project/delete', projectController.edit);


module.exports = routes;