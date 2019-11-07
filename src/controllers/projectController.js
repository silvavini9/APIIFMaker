const Project = require('../models/Project');
const Person = require('../models/Person');
const mongoose = require('mongoose');

const Admin = {
    "name": "admin@admin",
    "password": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
}

module.exports = {
    async index(req,res){
        const Projects = await Project.find();
        res.json(Projects);
    },
    async login(req, res){
        const { cpf, password } = req.body;
        const userLogin = await Person.findOne({CPF: cpf});
        if(userLogin.password == password){
            res.send(`Bem-vindo ${userLogin.name}`);
        } else{
            if(userLogin.name == "admin@admin" && userLogin.password == Admin.password){
                res.send("Bem-vindo Admin");   
            }
            res.send('CPF ou senha incorreta');
        }
    },
    async register(req,res){
        const { name, initialDate, finalDate, financialSupport, requestedfinancialSupport, otherParticipatingInstitutions, resourcesNeededProjectExecution, projectSummary }  = req.body;
        let ObjectId = mongoose.Types.ObjectId();
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
        await project.save((error) => {
            if(error){
                res.json(error);
            }else{
                res.json(project);
            }
        });
    },
    async search(req, res){
        const { clickedProject } = req.params;
        const project = await Project.findOne({ _id: clickedProject });
        res.json(project);
    },
    delete(req, res){
        console.log(req.headers);
    },
    async edit(req,res){
        const { name, initialDate, finalDate, financialSupport, requestedfinancialSupport, otherParticipatingInstitutions, resourcesNeededProjectExecution, projectSummary }  = req.body;
        const { usercpf, projectid } = req.headers;
        if(usercpf.admin == true){
            const projectEdited = await Project.findByIdAndUpdate( {_id: projectid},{
                    name,
                    initialDate,
                    finalDate,
                    financialSupport,
                    requestedfinancialSupport,
                    otherParticipatingInstitutions,
                    resourcesNeededProjectExecution,
                    projectSummary,
            });
            await projectEdited.save( error => {
                res.redirect('/projects');
            });
        } 
    }

} //Fechamento do Module.exports