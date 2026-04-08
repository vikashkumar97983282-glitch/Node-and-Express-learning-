const mongoose = require('mongoose');


const admin = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    age: Number,
    profile: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
})

module.exports = mongoose.model("admin", admin)