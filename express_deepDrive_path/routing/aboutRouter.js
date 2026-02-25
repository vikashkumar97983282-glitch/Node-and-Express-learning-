// core module
const path = require('path');

// External module
const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get("/about",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'about.html'));
    
});

aboutRouter.post("/about",(req,res,next)=>{
    console.log(req.body)
    res.sendFile(path.join(__dirname, '../', 'views', 'aboutMsg.html'))
})



module.exports = aboutRouter;