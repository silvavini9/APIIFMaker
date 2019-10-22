const Project = require('../models/Project');
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
        const { name, initialDate, finalDate, financialSupport, requestedfinancialSupport, otherParticipatingInstitutions, resourcesNeededProjectExecution, projectSummary }  = req.body;
        let ObjectId = mongoose.Types.ObjectId();
        const projectExist = await Project.findOne(({ CPF: cpf} ));
        if(projectExist){
            res.json(projectExist);
        } else {
            const project = new Project({
                _id: ObjectId,
                name: name,
                initialDate: initialDate,
                finalDate: finalDate,
                financialSupport: financialSupport,
                requestedfinancialSupport: requestedfinancialSupport,
                otherParticipatingInstitutions: otherParticipatingInstitutions,
                resourcesNeededProjectExecution: resourcesNeededProjectExecution,
                projectSummary: projectSummary,
            });
        };
        await project.save((error) => {
            if(error){
                res.json(error);
            }else{
                res.json(project)
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
        const user = await Person.findOne(({ CPF: cpf} ));
        const { userCpf } = req.headers;
        if(userCpf == Admin.password){
            await Person.findByIdAndRemove({ _id: user._id });
            res.send('Usuário deletado');
        } else {
            res.send('Você não pode excluir este usuário pois não você não é um administrador');
        }
    },
    async edit(req,res){
        const { password, name, cpf } = req.body;
        const { userCpf } = req.headers;
        const person = await Person.findByIdAndUpdate({ CPF: userCpf  }, {
            name: name,
            password: password,
            CPF: cpf
        })
        res.json(person)
    }
}