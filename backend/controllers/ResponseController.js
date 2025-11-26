const { Mongoose, default: mongoose, mongo } = require('mongoose')
const ResponseModel = require('../models/ResponsesModel')



const getResponse = async (req, res) =>{
    try {
      let filter = {}
      const taskref = req.query.taskid
      const student = req.user.id
      
      if (taskref) {
        // Validate taskid is a valid ObjectId before converting
         
        filter.task_id = new mongoose.Types.ObjectId(taskref)
      }

      if (student) {
        filter.student_id = student
      }
      
      console.log("Query filter:", filter)
      const items = await ResponseModel.find(filter)
      res.json(items) 
    } catch (error) {
        res.status(500).json({message: "Error fetching responses", error: error.message})
    }
}




const createResponse = async (req, res) =>{
   try {
    const {taskid, status, points, solutions } = req.body;
    let taskidobjectid = new mongoose.Types.ObjectId(taskid)
const graded = false
    const findexisting = await ResponseModel.findOne({student_id: req.user.id, task_id: taskidobjectid})

    if (findexisting) {
      console.log("EXISTING RESPONSE, DELETING...")
       await ResponseModel.findByIdAndDelete(findexisting._id)

    } else {
      console.log("NONE EXISTING, PROCEEDING....")
    }
console.log("CREATING RESPONSE...")
    const newitem = new ResponseModel({  student_id: req.user.id,
  task_id: taskidobjectid, status, points, solutions, graded})
    await newitem.save()
    console.log("OK....")
    res.status(201).json(newitem)
   } catch (error) {
    res.status(500).json({"message": "error", "error": error.message})
   }
}





const deleteResponse = async (req, res)=>{
    try {
        const id = req.params.id
        await ResponseModel.findByIdAndDelete(id)
        res.status(200).json({"message": "Successfully deleted"})
    } catch (error) {
        res.status(500).json({"message": "error occured", "error": error})
    }
}


const firstResponse = async(req,res)=>{
  try {
    const item = await ResponseModel.findOne({status: "awaiting"}).sort({createdAt: 1})
    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({"message": "error", "error": error})
  }
}

module.exports = {getResponse, createResponse, deleteResponse, firstResponse}