const { sign } = require('crypto')
const TasksModel = require('../models/TasksModel')
const { execSync } = require('child_process')
const { create } = require('../models/CourseModel')
const { read } = require('fs')
const { default: mongoose } = require('mongoose')

const getTasks = async (req,res)=>{
try {
    const filter = {}
    const lessonref = req.query.lessonref
    if (lessonref) {
        filter.lessonref = lessonref
    }
 
    const items = await TasksModel.find(filter).populate('lessonref', 'title')

    res.status(200).json(items)
} catch (error) {
    res.status(500)
}
}


const getTaskById = async (req, res) =>{
    try {
        const id = req.params.id
        const item = await TasksModel.findById(id)
        if (!item) {
            res.status(500).json({"message": "error", "error": "Not Found"})
        }

        res.status(200).json(item)
    } catch (error) {
        res.status(500)
    }
}

const getTasksByStudentId = async (req, res)=>{
    try {
        const id = req.user.id
        const items = await TasksModel.find({"responses.student_id": id})
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({"message": "error", "error": "Not Found"})
    }
}

const getTasksByCourseId = async (req, res)=>{
    try {
        const id = req.params.id
        const items = await TasksModel.find({"courseref": id})
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({"message": "error", "error": "Not Found"})
    }
}



const addTask = async (req, res)=>{
    try {
const { title, description, lessonref, maxpoints, type, language } = req.body;
        const responses = []
        let item = new TasksModel({title, description, lessonref, maxpoints, type, language})
        await item.save()
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}



const updateTask = async (req, res) =>{
    try {
      const body = req.body
      const id = req.params.id
      await TasksModel.findByIdAndUpdate(id, body, {new: true})
      res.status(200).json({"message": "updated"})
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

const deleteTask = async (req, res) =>{
    try {
      const id = req.params.id
      await TasksModel.findByIdAndDelete(id)
      res.status(200).json({"message": "deleted"})
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

module.exports = {getTasks, getTaskById, addTask, getTasksByStudentId, getTasksByCourseId, updateTask, deleteTask}