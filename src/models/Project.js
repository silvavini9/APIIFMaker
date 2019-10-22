const { Schema, model } = require("mongoose");
var ObjectId = Schema.Types.ObjectId;


const ProjectSchema = new Schema({
    _id: ObjectId,
    name: {
        type: String, 
        required: true,
    },
    initialDate:{
        type: Date,
        required: true,
    },
    finalDate:{
        type: Date,
        required: true,
    },
    financialSupport: {
        type: String,
    },
    requestedfinancialSupport: {
        type: String,
    },
    otherParticipatingInstitutions: {
        type: String,
    },
    resourcesNeededProjectExecution :[{
        type: String,
    }],
    projectSummary: {
        type: String,
        required: true,
    }
})

module.exports = model('Project', ProjectSchema);