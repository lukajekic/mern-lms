const express = require('express')
const router = express.Router()
const protect = require('../middleware/AuthMiddleware').protect


const CourseController = require('../controllers/CourseController')
router.get('/courses', protect, CourseController.getCourses)
router.get('/courses/:id', protect, CourseController.getCoursesById)
router.post('/courses', protect, CourseController.addCourse)
router.post('/join/:coursecode/', protect, CourseController.StudentJoin)
router.put('/courses/:id', protect, CourseController.updateCourse)
router.delete('/courses/:id', protect, CourseController.deleteCourse)

const LessonController = require('../controllers/LessonController')
router.get('/lessons', protect, LessonController.getLesson)
router.get('/lessons/:id', protect, LessonController.getLessonById)
router.post('/lessons', protect, LessonController.addLesson)
router.put('/lessons/:id', protect, LessonController.updateLesson)
router.delete('/lessons/:id', protect, LessonController.deleteLesson)

const TasksController = require('../controllers/TasksController')
router.get('/tasks', protect, TasksController.getTasks)
router.get('/tasks/:id', protect, TasksController.getTaskById)
router.get('/student/tasks/:id', protect, TasksController.getTasksByStudentId)
router.get('/course/tasks/:id', protect, TasksController.getTasksByCourseId)
router.post('/tasks', protect, TasksController.addTask)
router.put('/tasks/:id', protect, TasksController.updateTask)
router.delete('/tasks/:id', protect, TasksController.deleteTask)
const ResponseController = require('../controllers/ResponseController')

router.get('/response', protect, ResponseController.getResponse)
router.post('/response', protect, ResponseController.createResponse)
router.delete('/response/:id', protect, ResponseController.deleteResponse)

const textBooksController = require('../controllers/TextbookController')

router.get('/textbooks', protect, textBooksController.getTextbooks)
router.post('/textbooks', protect, textBooksController.addTextbook)
router.put('/textbooks/:id', protect, textBooksController.updateTextbook)
router.delete('/textbooks/:id', protect, textBooksController.deleteTextbook)

//upload
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb)=>{

        cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

router.post('/upload', upload.array('files', 5), (req, res)=>{
res.status(200).json(req.files.map(item => item.filename))
})


router.get('/upload/:filename', protect, (req, res)=>{
    const filename = req.params.filename

    if (req.query.view && req.query.view === "true") {
            res.sendFile(path.join(__dirname, `../uploads/${filename}`))

    } else {
    res.download(path.join(__dirname, `../uploads/${filename}`))

    }


})




const UserController = require('../controllers/UserController')
const { protectTeacher } = require('../middleware/AuthMiddleware')
router.post('/user/register', UserController.registerUser)
router.post('/user/login', UserController.loginUser)
router.get('/user/me', protect, UserController.getUserData)
router.post('/user/logout', UserController.Logout)
router.post('/user/checklogin', protect, UserController.checkLoginStatus)
router.put('/user/update', protect, UserController.updateUser)
router.get('/user/roles', protect, UserController.getRoles)


router.post('/user/checkteacher', protect, protectTeacher)

//admin
router.get('/teacher/firstresponse', protect, protectTeacher, ResponseController.firstResponse)

module.exports = router