const express = require("express");
const mongoose = require("mongoose");

const Router = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://IFMaker:AI6FUkclPbOQRrUX@apiifmaker-orl5t.mongodb.net/IFMaker?retryWrites=true&w=majority', { 
    useNewUrlParser: true, useUnifiedTopology: true
});

server.use(express.json())
server.use(Router);

// GET, POST, PUT, DELETE

server.listen(3333);