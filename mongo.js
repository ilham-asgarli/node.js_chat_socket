const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

module.exports = async () => {
    await mongoose.connect(MONGODB_URI).then((result) => {
        console.log("Mongo connected...")
    }).catch((err) => {
        console.log("Error:", err)
    })
}