const { default: mongoose, Mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    course_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
})


const LessonModel = mongoose.model("Lesson", schema, "lessons")
module.exports = LessonModel
