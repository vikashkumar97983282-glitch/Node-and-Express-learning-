const express = require('express');
const router = express.Router();
const adminModel = require('../model/admin');


router.get("/", (req,res)=>{
    res.send("this is admin page!")
})

router.post('/register', async (req,res)=>{
    let {name, email, password, age} = req.body;
    let admin = await adminModel.find();

    if(admin.length > 0) return res.status(400).send("admin already exists");

    try {
        const data = await adminModel.create({
            name,
            email,
            password,
            age
        })
        res.send("admin registered successfully")

    }
    catch(err){

    }
})


module.exports = router;