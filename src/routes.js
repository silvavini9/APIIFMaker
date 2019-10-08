const express = require("express");
const routes = express.Router();
const PersonController =  require("./controllers/PersonController");

// Fazer integração com o bd e os controllers
routes.get('', )

routes.post('/register', PersonController.register)


module.exports = routes;