const Person = require('../models/Person');
const mongoose = require('mongoose');


module.exports = {
    async index(req,res){
        
    },
    async register(req,res){
        const { name, cpf }  = req.body;
        var ObjectId = mongoose.Types.ObjectId();
        var firstUser = await Person.find().then((user) => {
            if(user == 0){
                return true;
            }else {
                return false;
            }
        });
        var userExist = await Person.findOne(({ CPF: cpf} ), (user) => {
            if(user) {
                return true;
            } else {
                return false;
            }
        });

        if( firstUser == true){
            var person = new Person({
                _id: ObjectId,
                name: name,
                CPF: cpf,
                password: cpf,
                admin: true    
            });
        }else { 
            if(userExist){
                res.send('Usuário já existente');
            } else {
                var person = new Person({
                    _id: ObjectId,
                    name: name,
                    CPF: cpf,
                    password: cpf,
                    admin: false,
                });
            }
        };
        await person.save((error) => {
            if(error){
                res.json(error);
            }
            else{
                res.json(person)
            }
        });
    }
}