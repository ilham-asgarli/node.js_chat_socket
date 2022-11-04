var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI

module.exports = () => {
    mongoose.connect(MONGODB_URI, {useMongoClient: true});

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
}