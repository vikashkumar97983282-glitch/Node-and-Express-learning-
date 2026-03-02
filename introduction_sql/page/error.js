const express = require('express');
const handling = express.Router();

handling.get((req,res,next)=>{
    res.send("this is error message!")
});

module.exports = handling;