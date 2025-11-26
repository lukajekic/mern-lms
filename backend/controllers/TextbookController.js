const mognoose = require('mongoose')
const texbooksmodel = require('../models/TextbooksModel')

const getTextbooks = async(req, res) =>{
    try {
        const filter = {}
    if (req.query.lessonref) {
        filter.lesson_id = req.query.lessonref
    }

    let items = await texbooksmodel.find(filter)
    if (!items) {
        res.status(404).json({"message": "not found"})
    }

    res.status(200).json(items)
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

const addTextbook = async(req, res) =>{
    try {

const {title, description, lesson_id, filename} = req.body
    let newitem = new texbooksmodel({title, description, lesson_id, filename})
  await newitem.save()

    res.status(200).json(newitem)
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

const updateTextbook = async(req, res) =>{
    try {


const id = req.params.id
    let newitem = await texbooksmodel.findByIdAndUpdate(id, req.body, {new: true})

    res.status(200).json(newitem)
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}


const deleteTextbook = async(req, res) =>{
    try {

const id = req.params.id
   await texbooksmodel.findByIdAndDelete(id)

    res.status(200).json({"message": "delete success"})
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

module.exports = {getTextbooks, addTextbook, updateTextbook, deleteTextbook}