const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({quiet: true})


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// database connection 
const db = require("./config/db")

// routes 
const userroutes = require("./routes/userroutes")


app.get('/', (req,res)=>{
    let token = jwt.sign({email:"vikash@gmail.com"}, "secretkey");
    res.cookie("token", token );
    res.send("cookie is set")
})

app.get("/home", (req,res)=>{
    let token = req.cookies.token;
    let data = jwt.verify(req.cookies.token, "secretkey");
    console.log(data)
    res.send("welcome to home page")
})

app.use("/user", userroutes)




const port = process.env.port;
app.listen(port, ()=>{
    console.log(`server is running on address http://localhost:${port}`);
})