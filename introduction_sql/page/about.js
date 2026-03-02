const path = require('path')

const express = require('express');
const homerouter = require('./home');
const aboutrouter = express.Router();


aboutrouter.get("/about",(req,res,next)=>{
    console.log("about page",req.url,req.method, req.body);
    res.send(`
        <h1> this is about page. please fill require details</h1>
        <form action="/about" method="POST">

        <input type="text" name="name" placeholder="enter your name"/>
        <input type="email" name="email" placeholder="enter your email"/>
        <input type="password" name="password" placeholder="enter your password"/>
        <button > submit </button>

        </form>
        `);
});

aboutrouter.post("/about",(req,res,next)=>{
    console.log(req.body);
    res.send(`<h1> Hiii ${req.body.name} register successfully</h1>`)
})

module.exports = aboutrouter;