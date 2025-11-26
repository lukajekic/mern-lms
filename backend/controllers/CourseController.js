const CourseModel = require('../models/CourseModel')


const getCourses = async (req, res) =>{
    const studentid = req.user.id
    filter = {}


    if (studentid) {
        filter.students = studentid
    }
    try {
       const items = await  CourseModel.find(filter)
    res.json(items) 
    } catch (error) {
        res.status(500).json({message: "Error fetching courses", error: error.message})
    }
}




const StudentJoin = async (req, res)=>{
    try {
        let coursecode = req.params.coursecode
            let studentid = req.user.id
console.log(`${coursecode}/${studentid}`)
        let item = await CourseModel.findOne({invite_code: coursecode})
        console.log(item)
        if (!item) {
            res.status(404).json({"message": "not found"})
        }
        item.students.push(studentid)
        await CourseModel.findByIdAndUpdate(item._id, item)
        res.status(200).json({"message": "success"})
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}



const getCoursesById = async (req, res) =>{
    const id = req.params.id
    if (!id) {
        res.status(500).json({"message": "error", "error": "ID is not provided"})
    }
    try {
        
        const item = await CourseModel.findById(id)
        if (!item) {
            res.status(500).json({"message": "error", "error": "Item not found"})
        }

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

const addCourse = async (req, res) =>{
   try {
     console.log("req.body:", req.body)
     const {title, teacher_name, teacher_email, description, invite_code} = req.body
     
     if (!title || !teacher_name || !teacher_email || !description || !invite_code) {
       return res.status(400).json({message: "Missing required fields", received: req.body})
     }
     
    const newItem = new CourseModel({title, teacher_name, teacher_email, description, invite_code})
    await newItem.save()
    res.status(201).json(newItem)
   } catch (error) {
    console.error("Error in addCourse:", error)
    res.status(500).json({message: "Error adding course", error: error.message})
   }
}


const updateCourse = async (req,res) =>{
  try {
      const body = req.body
    const id = req.params.id
    await CourseModel.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({"message": "updated"})
  } catch (error) {
        res.status(500).json({"message": "error occured", "error": error})

  }
}


const deleteCourse = async (req, res)=>{
    try {
        const id = req.params.id
        await CourseModel.findByIdAndDelete(id)
        res.status(200).json({"message": "Successfully deleted"})
    } catch (error) {
        res.status(500).json({"message": "error occured", "error": error})
    }
}

module.exports = {getCourses, addCourse, updateCourse, deleteCourse, getCoursesById, StudentJoin}