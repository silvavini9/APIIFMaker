const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;


const PersonSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    CPF: {
        type: String,
        required: true,
    },
    academicDegree:{
        type: String,
        required: true,
    },
    admin: { 
        type: Boolean, 
        default: false
    },
    SIAPE:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = model('Person', PersonSchema);