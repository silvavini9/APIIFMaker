const { Schema, model } = require("mongoose");
var ObjectId = Schema.Types.ObjectId;


const PersonSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: true,
    },
    validity:{
        type: Date,
        required: true,
    },
    financialSupport: {
        type: String,
    },
})

module.exports = model('Person', PersonSchema);