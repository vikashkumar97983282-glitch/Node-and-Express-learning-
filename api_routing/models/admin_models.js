const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        maxLength:50,
        trim:true
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String,
});


module.exports = mongoose.model("Admin",adminSchema);