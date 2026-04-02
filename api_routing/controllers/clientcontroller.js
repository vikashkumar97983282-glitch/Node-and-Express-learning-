const express = require('express');


exports.getclientDashboard = (req,res)=>{
    res.send("this is client dashboard page. this page is only accessible to client users")
}