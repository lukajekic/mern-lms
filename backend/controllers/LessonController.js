const { Mongoose, default: mongoose } = require('mongoose')
const LessonModel = require('../models/LessonModel')


const getLesson = async (req, res) =>{
    try {
      let filter = {}
      const courseref = req.query.courseref
      console.log("courseref", courseref)
      if (courseref) {
        filter.course_ref = new mongoose.Types.ObjectId(courseref)
      }
       const items = await  LessonModel.find(filter)
    res.json(items) 
    } catch (error) {
        res.status(500).json({message: "Error fetching courses", error: error.message})
    }
}

const getLessonById = async (req, res)=>{
  try {
 const id = req.params.id
 let item = await LessonModel.findById(id)
 if (!item) {
  res.status(500).json({"message": "error", "error": "Item not found"})
 }
 res.status(200).json(item)
  } catch (error) {
    res.status(500).json({"message": "error", "error": error})
  }
}


const addLesson = async (req, res) =>{
   try {
     console.log("req.body:", req.body)
     const {title, description, course_ref} = req.body
     
     if (!title || !course_ref) {
       return res.status(400).json({message: "Missing required fields", received: req.body})
     }
     
    const newItem = new LessonModel({title, description, course_ref})
    await newItem.save()
    res.status(201).json(newItem)
   } catch (error) {
    console.error("Error in addCourse:", error)
    res.status(500).json({message: "Error adding course", error: error.message})
   }
}


const updateLesson = async (req,res) =>{
  try {
      const body = req.body
    const id = req.params.id
    await LessonModel.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({"message": "updated"})
  } catch (error) {
        res.status(500).json({"message": "error occured", "error": error})

  }
}


const deleteLesson = async (req, res)=>{
    try {
        const id = req.params.id
        await LessonModel.findByIdAndDelete(id)
        res.status(200).json({"message": "Successfully deleted"})
    } catch (error) {
        res.status(500).json({"message": "error occured", "error": error})
    }
}

module.exports = {getLesson, addLesson, updateLesson, deleteLesson, getLessonById}