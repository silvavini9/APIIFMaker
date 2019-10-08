const Person = require('../models/Person');
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

module.exports = {
    async register(req,res){
        const { name, cpf }  = req.body;

        var firstUser = await Person.find({}, (user) => {
            console.log(user);
        //     if(user > 0){
        //         return false;
        //     }
        //     else {
        //         return true;
        //     }
        });

        // if(firstUser){
        //     var person = new Person({
        //         _id: ObjectId,
        //         name: name,
        //         CPF: cpf,
        //         password: cpf,
        //     });
        // }
        // else{
        //     var person = new Person({
        //         _id: ObjectId,
        //         name: name,
        //         CPF: cpf,
        //         admin: true,
        //         password: cpf,
        //     });
        // } 
        // await person.save((error) => {
        //     if(error){
        //         res.json(error);
        //     }
        //     else{
        //         res.json(person)
        //     }
        // });
        
    }
}