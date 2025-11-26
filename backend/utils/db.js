const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONNECTION_URL


async function connectDB() {
    try {
        console.log(mongo_url)
    await mongoose.connect(mongo_url)
    
    console.log("MONGODB CONNECTED")
} catch (error) {
    console.log("MONGO ERROR")
}
}

module.exports = connectDB