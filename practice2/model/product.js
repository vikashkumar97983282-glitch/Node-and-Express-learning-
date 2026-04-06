const mongoose = require('mongoose');

const product = mongoose.Schema({
    productName: String,
    price: Number,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    } 
})

module.exports = mongoose.model("product", product);