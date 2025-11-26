const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel')


const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password, roles, profileimage} = req.body
    if (!name || !email || !password || !roles || !profileimage) {
        res.status(500).json({"message": "error", "error": "Fill all fields."})
    }
const userexists = await UserModel.findOne({email: email})
if (userexists) {
     res.status(500).json({"message": "error", "error": "User exists"})
}

//hash pass
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password, salt)
const user = new UserModel({name, email, password: hashed, roles, profileimage})
const saved = await user.save()


if (saved) {
    res.cookie("token", generateJWT(user._id), {
    maxAge: 2592000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
   })

   res.status(200).json(user)
} else {
res.status(500).json({"message": "invalid inputs"})
}

    
})



const loginUser = asyncHandler(async (req, res)=>{
const {email, password} = req.body

const user = await UserModel.findOne({email: email})


if (user &&  (await bcrypt.compare(password, user.password))) {
   res.cookie("token", generateJWT(user._id), {
    maxAge: 2592000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
   })

   res.status(200).json({"message": "login"})
} else {


    res.status(500).json({"message": "Invalid credentials"})
}

/*     if (user && )
 */
    
})



const getUserData = asyncHandler(async (req, res)=>{
const {_id, name, email, profileimage, roles} = await UserModel.findById(req.user.id)

res.status(200).json({
    id: _id,
    name: name,
    email: email,
    profileimage: profileimage,
    roles: roles
})
})


const Logout = asyncHandler(async(req,res)=>{
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })
      res.status(200).json({ message: 'Logged out successfully' });

})


const checkLoginStatus = async (req, res) =>{
    res.status(200).send("OK")
}

const updateUser = async (req,res) =>{
   try {
     const userID = req.user.id
    const body = req.body

    const item = await UserModel.findById(userID)

    if (body.name) {
    item.name = body.name

    }

    if (body.email) {
    item.email = body.email

    }

    if (body.password) {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(body.password, salt)
    item.password = hashed

    }

    await item.save()
    res.status(200).json({"message": "updated"})
   } catch (error) {
    res.status(500).json({"message": "error", "error": error})
   }


  
}


const getRoles = async(req,res)=>{
    try {
        const user = await UserModel.findById(req.user.id)
    if (user && user.roles) {
        res.status(200).json(user.roles)
    } else {
        res.status(500).json({"message": "not found"})
    }
    } catch (error) {
        res.status(500).json({"message": "error", "error": error})
    }
}

const generateJWT = (id) =>{
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}
module.exports = {registerUser, checkLoginStatus, loginUser, getUserData, Logout, updateUser, getRoles}