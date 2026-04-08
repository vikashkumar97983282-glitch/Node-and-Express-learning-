const express = require('express');
const jwt = require('jsonwebtoken'); 

// login and registration 
function isLogin(req,res,next){
    if (req.cookies.token === "") return res.send("please login to access this page");
    else {
        let data = jwt.verify(req.cookies.token, "danger");
        req.user = data;
    }
    next();
}

module.exports = isLogin;