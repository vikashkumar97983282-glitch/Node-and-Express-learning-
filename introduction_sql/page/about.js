const path = require('path')
const {setUser} = require('../query/dboperation')

const express = require('express');
const homerouter = require('./home');
const aboutrouter = express.Router();


aboutrouter.get("/about",(req,res,next)=>{
    console.log("about page",req.url,req.method, req.body);
    res.send(`
        <h1> this is about page. please fill require details</h1>
        <form action="/about" method="POST">

        <input type="text" name="name" placeholder="enter your name"/>
        <input type="number" name="run" placeholder="enter your run"/>
        <input type="text" name="country" placeholder="enter your country"/>
        <button > submit </button>

        </form>
        `);
});

aboutrouter.post("/about",(req,res)=>{
    // console.log(req.body);
    // res.send(`<h1> Hiii ${req.body.name} register successfully</h1>`)
    setUser(req,res);
})

module.exports = aboutrouter;