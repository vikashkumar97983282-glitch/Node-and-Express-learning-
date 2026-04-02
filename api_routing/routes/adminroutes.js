const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admincontroller")
const Admin = require("../models/admin_models")


router.get("/",adminController.getadminDashboard);

router.post("/create",async (req,res)=>{
    let admin = await Admin.find();
    if (admin.length > 0){
        return res.status(500).send("can't add another user's")
    }

    let {fullname ,email ,password} = req.body;
    let createAdmin = await Admin.create({
        fullname,
        email,
        password
    })
    console.log(createAdmin)

    res.status(200).send(createAdmin)
})


module.exports = router;