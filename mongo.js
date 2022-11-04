var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI
const fixieData = process.env.FIXIE_SOCKS_HOST.split(new RegExp('[/(:\\/@/]+'));

module.exports = async () => {
    await mongoose.connect(MONGODB_URI, {
        proxyUsername: fixieData[0],
        proxyPassword: fixieData[1],
        proxyHost: fixieData[2],
        proxyPort: fixieData[3],
    }).then((result) => {
        console.log("Mongo connected...")
    }).catch((err) => {
        console.log("Error:",err)
    })
}