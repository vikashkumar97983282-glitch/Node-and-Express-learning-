const express = require("express");
const admin_models = require("../models/admin_models");
const Admin = require("../models/admin_models")


exports.getadminDashboard = async (req,res)=>{
    let user = await Admin.find();

    res.send(user)
}