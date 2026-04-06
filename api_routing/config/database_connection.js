const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose)
.then(function(){
    console.log("❄❄ database connected successfully✅");
})
.catch (function(err){
    console.log(err)
})