const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },


    lessonref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },

    maxpoints: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: false
    }
})

const TasksModel = mongoose.model("Task", schema, "tasks")
module.exports = TasksModel