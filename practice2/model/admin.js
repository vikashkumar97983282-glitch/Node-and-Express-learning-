const mongoose = require('mongoose');


const admin = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    avatar: {
        type: String,
        default:
    }
})

module.exports = mongoose.model("admin", admin)