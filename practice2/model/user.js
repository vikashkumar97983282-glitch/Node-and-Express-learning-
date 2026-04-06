const mongoose = require('mongoose');

const user = mongoose.Schema({
    name : {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    age: Number,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
})

module.exports = mongoose.model("user", user);