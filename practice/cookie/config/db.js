const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose_url)
.then(()=>{
    console.log("connected to database");
}). catch ((err)=>{
    console.log(err);
})


const cookie_user = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
})

module.exports = mongoose.model("cookie_user", cookie_user)