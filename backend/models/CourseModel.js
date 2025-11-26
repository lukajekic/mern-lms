const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    teacher_name: {
        type: String,
        required: true
    },

    teacher_email: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    invite_code: {
        type: String,
        required: true
    },

    students: {
        type: Array,
        required: true
    }
})


const CourseModel = mongoose.model("Course", schema, "courses")
module.exports = CourseModel
