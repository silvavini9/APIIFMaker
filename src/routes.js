const express = require("express");
const routes = express.Router();
const personController =  require("./controllers/personController");
const projectController =  require("./controllers/projectController");

// Fazer integração com o bd e os controllers
routes.get('/users', personController.index)//
routes.post('/user/register', personController.register);
routes.post('/login', personController.login );
routes.post('/user/:clickedUser', personController.search)
routes.put('/edit', personController.edit);
routes.delete('/delete', personController.delete);

routes.get('/projects', projectController.index);
routes.post('/project/add', projectController.register);
routes.post('/',);


module.exports = routes;