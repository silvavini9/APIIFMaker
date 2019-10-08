const { Schema, model } = require("mongoose");
var ObjectId = Schema.Types.ObjectId;


const PersonSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: true,
    },
    CPF: {
        type: String,
        required: true,
    },
    admin: { 
        type: Boolean, 
        default: false
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = model('Person', PersonSchema);