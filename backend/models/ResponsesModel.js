const mongoose = require("mongoose")

const schema = new mongoose.Schema({

student_id: {
    type: String,
    required: true,
},

task_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task'
},

status: {
    type: String,
    required: true
},

points: {

    type: Number,
    required: true
},

solutions: {
    type: Array,
    required: true
},

graded: {
    type: Boolean,
    required: true
}

}, {timestamps: true})


const ResponsesModel = mongoose.model("Response", schema, "responses")
module.exports = ResponsesModel