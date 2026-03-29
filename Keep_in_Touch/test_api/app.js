const express = require('express');
const app = express();
const usermodel = require('./connection/connection');


app.get("/",(req,res)=>{
    console.log("welcome to my api");
    res.send("welcome users's")
})


app.get("/users",async (req,res)=>{
    let data = await usermodel.find();
    res.send(data);
})


app.get("/add",async (req,res)=>{
    let data = await usermodel.create({
        name : "vikash kumar",
        age : 22,
        email : "vikash@gmail.com"
    })
    res.send("user added successfully");
})




const port = 3000;


app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
})