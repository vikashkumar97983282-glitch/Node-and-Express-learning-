const express = require('express');
const userRouter = express.Router();

userRouter.get("/",(req,res,next)=>{
    res.send(
        `<h1>this is host page</h1>
        <a href="/add-home">add home</a>
        `);
});

module.exports = userRouter;