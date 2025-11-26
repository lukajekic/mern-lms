const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const user = require('../models/UserModel')

const protect = asyncHandler(async (req, res, next)=>{
    let token = req.cookies.token


    if (!token) {
                    res.status(401).json({"message": "Not Authorized, no token"})

    }


    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await user.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({"message": "Not Authorized"})

        }
    }

    
})


const protectTeacher = asyncHandler(async(req,res,next)=>{
   if (req.user.roles.includes('teacher')) {
    next()
   } else {
    res.status(402).send("NOT A TEAHCER")
   }
})


module.exports = {protect, protectTeacher}