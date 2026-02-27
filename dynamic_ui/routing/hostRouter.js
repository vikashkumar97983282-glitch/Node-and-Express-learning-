// core module
const path = require('path');

// External module
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'addHome.html'));
});

const name = [];

hostRouter.post("/add-home",(req,res,next)=>{
    console.log("name registration successfully",req.body, req.body.Name);
    name.push({name : req.body.Name});
    console.log(name)
    res.sendFile(path.join(__dirname, '../', 'views', 'addHomeNext.html'));
    
        
});

exports.hostRouter = hostRouter;
exports.name = name;