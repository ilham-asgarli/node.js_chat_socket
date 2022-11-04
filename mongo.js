var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://chat:chat@0.zxfpl5s.mongodb.net/?retryWrites=true&w=majority"

module.exports = () => {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
}