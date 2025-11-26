const { default: mongoose } = require('mongoose')
const mognoose = require('mongoose')

const schema = new mognoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    lesson_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    filename:  {
        type: String,
        required: true
    }
})

const texbooksmodel = mongoose.model("Textbooks", schema, "textbooks")
module.exports = texbooksmodel