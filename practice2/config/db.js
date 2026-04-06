const mongoose = require('mongoose');


mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log('connected to database successfully');
})
.catch((err)=>{
    console.err(err);
})