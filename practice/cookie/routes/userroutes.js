const express = require('express');
const router = express.Router();
const users = require("../config/db")
const bcrypt = require("bcrypt")

// register user to database with hashed password
router.post("/register", (req,res)=>{
    let {name,email,password,age} = req.body

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
            let data = await users.create({
                name ,
                email,
                password: hash,
                age
            })
            res.send("user is registered")
        })
    })


})

router.get("/getusers", async (req,res)=>{
    let data = await users.find();
    res.send(data)
})

// login to check the password is correct or not
router.post("/login", async (req,res)=>{
    let data = await users.findOne({email: req.body.email});
    let {email, password} = req.body;

    bcrypt.compare(req.body.password, data.password, function(err, result) {
        if(!result){
            return res.send("invalid credentials")
        }
        res.send("login successful")
    });
})

// clear the cookie to logout
router.get("/logout" , (req,res)=>{
    res.cookie("token", "");
    res.send("logout successful")
})




module.exports = router;