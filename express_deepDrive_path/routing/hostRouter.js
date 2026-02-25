const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
    res.send(
        `<h1>Register your details here:</h1>
        <form action="/add-home" method="POST">
        <input type="text" name="houseName" placeholder="Enter the name of your house" />
        <input type="submit" />
        </form>
        `);
});

hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.body);
    res.send(
        `<h1>Register Successfully! ${req.body.houseName}</h1>
        <a href="/add-home">go to home</a>
        <br/>
        <a href="/about">go to about </a>
        `);
        
});

module.exports = hostRouter;