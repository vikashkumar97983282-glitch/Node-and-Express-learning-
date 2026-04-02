const express = require('express');


exports.getcompanyDashboard = (req,res)=>{
    res.send("this is company dashboard page. this page is only accessible to company users")
}