var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI

module.exports = async () => {
    await mongoose.connect(MONGODB_URI, {useMongoClient: true}).then((result) => {
        console.log("Mongo connected...")
    }).catch((err) => {
        console.log(err)
    })
}