const Person = require('../models/Person');
const mongoose = require('mongoose');

const Admin = {
    "name": "admin",
    "password": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
}

module.exports = {
    async index(req,res){
        var persons = await Person.find();
        res.json(persons);
    },
    async login(req, res){
        var {cpf, password} = req.body;
        var userLogin = await Person.findOne({CPF: cpf});
        if(userLogin.password == password){
            res.send('Logado com sucesso');
        }else {
            res.send('CPF ou senha incorreta');
        }
    },
    async register(req,res){
        const { name, cpf }  = req.body;
        var ObjectId = mongoose.Types.ObjectId();
        var userExist = await Person.findOne(({ CPF: cpf} ));
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
        };
        await person.save((error) => {
            if(error){
                res.json(error);
            }else{
                res.json(person)
            }
        });
    },
    async delete(req, res){
        var { cpf } = req.body;
        console.log(cpf)
        var user = await Person.findOne(({ CPF: cpf} ));
        res.json(user);
        // var {admin} = req.headers;
        // if(admin == Admin.password){
        //     await Person.findByIdAndRemove({ _id: user._id });
        //     res.send('Usuário deletado')
        // } else {
        //     res.send('Você não pode excluir este usuário pois não você não é um administrador');
        // }
    },
}