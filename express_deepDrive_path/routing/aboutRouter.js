const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get("/about",(req,res,next)=>{
    res.send(`
        <h1>this is about page </h1>
        <form action="/about" method="POST">
        <input type="text" name="user" placeholder="enter your name"/>
        <br/>
        <br/>
        <textarea name="comment" rows="4" cols="50" placeholder="Write your comment here"></textarea>
        <input type="submit"/>
        <br/>
        <br/>
        <button><a href="/add-home">go to home</a></button>
        </form>
        `)
});

aboutRouter.post("/about",(req,res,next)=>{
    console.log(req.body)
    res.send(`
        <h1>${req.body.user} register successfully!</h1>
        `)
})



module.exports = aboutRouter;