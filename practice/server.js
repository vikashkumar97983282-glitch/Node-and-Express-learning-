const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.use(cookieParser());

// set cookies
app.get("/", (req,res)=>{
    res.cookie("name","vikash");
    res.send("done");
})

// get cookies
app.get("/home", (req,res)=>{
    console.log(req.cookies)
    res.send("this is home page")
})


// set jwt token in cookie
app.get("/about", (req,res)=>{
    let token = jwt.sign({"name":"vikash"}, "secret")
    console.log(token)
    res.send("this is about page")
})



app.listen(3000,()=>{
    console.log("server is running on address http://localhost:3000");
})