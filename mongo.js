var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI

module.exports =  () => {
    mongoose.connect(MONGODB_URI, {useMongoClient: true}).then((result) => {
        console.log("Mongo connected...")
    }).catch((err) => {
        console.log(err);
    })
    
    mongoose.Promise = global.Promise;
}