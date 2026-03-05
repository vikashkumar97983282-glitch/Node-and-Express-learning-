const {getUsers} = require('../query/dboperation')

const express = require('express');
const showrouter = express.Router();
const homerouter = require('./home');
const aboutrouter = require('./about')


showrouter.get("/show",async (req,res,next)=>{
    try{
        const users = await getUsers();
        // res.status(200).json(users);
        res.write("<h1>User list</h1>")
        res.write("<h3>username,run,country</h3>")
        users.forEach((user,idx)=>{
            res.write(`<li style="border:2px solid blue; width:20%; height:4%; paddig:5px; color:red;">${idx+1}.  ${user.name} -- ${user.run} -- ${user.country}</li>`)
        })
        res.write(`<br><a href="/">go to home</h1>
            <br>
            <a href="/about">go to Add user</h1>`)
        res.end()
        
        
    }
    catch(error){
        next(error)
    }
  
})

module.exports = showrouter;