const express = require("express");
const routes = express.Router();
const PersonController =  require("./controllers/PersonController");

// Fazer integração com o bd e os controllers
routes.post('/user/register', PersonController.register);
routes.post('/login', PersonController.login );
routes.put('/edit', PersonController.edit);
routes.delete('/delete', PersonController.delete );


module.exports = routes;