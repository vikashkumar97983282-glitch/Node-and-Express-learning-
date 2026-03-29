const mongoose = require('mongoose');


mongoose.connect(`mongodb://127.0.0.1:27017/userdata`);

const userschema = mongoose.Schema({
    name : String,
    age : Number,
    email : String
})

module.exports = mongoose.model("userdata",userschema);