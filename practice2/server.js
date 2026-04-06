const express = require('express');
const app = express();
require('dotenv').config({quiet: true});




// connecting to database
require('./config/db')



// middlewares
app.get('/', (req,res)=>{
    console.log("middleware executed");
    res.send("Hello Programmers");
})










// starting the server
const port = process.env.port;
app.listen(port , ()=>{
    console.log(`server is running on address http://localhost:${port}`)
})