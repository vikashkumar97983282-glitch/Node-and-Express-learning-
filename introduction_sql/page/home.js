const express = require('express');
const homerouter = express.Router();


homerouter.get("/",(req,res,next)=>{
    console.log("this home page execution",req.url,req.method)
    res.send(`
        <h1>this is home route</h1>
        <a href="/about">about page</h1>
        `);
});


module.exports = homerouter;