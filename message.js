var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: String,
    roomId: String,
    userId: String,
    created_at:  {type: Date, default: Date.now},
});

module.exports = mongoose.model("message", messageSchema);