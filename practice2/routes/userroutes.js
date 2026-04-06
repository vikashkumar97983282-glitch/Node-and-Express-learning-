const express = require('express');
const router = express.Router();
const userModel = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get("/", async (req,res)=>{
    const data = await userModel.find().populate('product');
    res.status(200).send(data);
});

router.post('/register', (req,res)=>{
    let {name,email,password,age,product} = req.body;
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
            const data = await userModel.create({
                name,
                email,
                password:hash,
                age,
                product
            })
        })
        res.status(201).send("user registered successfully")
    })
    
})


router.post('/login' , async (req,res)=>{
    let {email,password} = req.body;
    let data = await userModel.findOne({email});

    if(!data) return res.status(404).send("user not found");

    bcrypt.compare(password, data.password, function(err, result){
        if(!result) {

            return res.status(401).send("invalid credentials");
        } 

        let token = jwt.sign({email:email}, "danger")
        res.cookie("token", token)
        res.status(200).send("login successful");
    });

});


router.post('/logout', (req,res)=>{
    res.clearCookie("token");
    res.status(200).send("logout successful");
})




module.exports = router;