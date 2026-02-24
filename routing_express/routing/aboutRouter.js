const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get("/about",(req,res,next)=>{
    res.send(`
        <h1>this is about page </h1>
        `)
})



module.exports = aboutRouter;