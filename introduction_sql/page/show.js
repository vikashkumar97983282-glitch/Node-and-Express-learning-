const {getUsers} = require('../query/dboperation')

const express = require('express');
const showrouter = express.Router();


showrouter.get("/show",async (req,res)=>{
    // console.log("this is show page message",getUsers(req,res));
    const data = getUsers();
    console.log(data);
  
})

module.exports = showrouter;