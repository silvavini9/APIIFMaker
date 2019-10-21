const Person = require('../models/Person');
const mongoose = require('mongoose');

const Admin = {
    "name": "admin@admin",
    "password": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
}

module.exports = {
    async index(req,res){
        const persons = await Person.find();
        res.json(persons);
    },
    async login(req, res){
        const { cpf, password } = req.body;
        const userLogin = await Person.findOne({CPF: cpf});
        if(userLogin.password == password){
            res.send(`Bem-vindo ${userLogin.name}`);
        } else {
            if(userLogin.name == "admin@admin" && userLogin.password == Admin.password){
                res.send("Bem-vindo Admin");   
            }
            res.send('CPF ou senha incorreta');
        }
    },
    async register(req,res){
        const { name, cpf, siape, graduacao, email }  = req.body;
        let ObjectId = mongoose.Types.ObjectId();
        const userExist = await Person.findOne(({ CPF: cpf} ));
        if(userExist){
            res.send('Usuário já existente');
        } else {
            var person = new Person({
                _id: ObjectId,
                name: name,
                CPF: cpf,
                email: email,
                academicDegree: graduacao,
                SIAPE: siape,
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
    async search(req, res){
        const { clickedUser } = req.params;
        const user = await Person.findOne({ CPF: clickedUser });
        res.json(user);
    },

    async list(req, res){
        const users = await Person.find();
        res.json(users);
    },

    async delete(req, res){
        const { cpf } = req.body;
        const user = await Person.findOne({ CPF: cpf} );
        const { usercpf } = req.headers;
        if(usercpf == Admin.password){
            await Person.findByIdAndRemove({ _id: user._id });
            res.send('Usuário deletado');
        } else {
            res.send('Você não pode excluir este usuário pois não você não é um administrador');
        }
    },
    
    async edit(req,res){
        const { password, name, cpf, admin } = req.body;
        const { usercpf } = req.headers;
        console.log(usercpf);
        const user = await Person.findOne({ CPF: usercpf} );
        console.log(user);
        const person = await Person.findByIdAndUpdate({ _id: user._id  }, {
            name: name,
            password: password,
            CPF: cpf,
            admin: admin,
        })
        await person.save((error) => {
            if(error){
                res.json(error);
            }else {
                res.json(person)
            }
        })
        
    }
}