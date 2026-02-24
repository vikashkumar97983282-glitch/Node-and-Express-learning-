const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use((req,res,next)=>{
    console.log("this is first middleware code", req.url, req.method);
    next();
});

app.use((req,res,next)=>{
    console.log("this is second middleware code", req.url, req.method);
    next();
});

// app.use((req,res,next)=>{
//     console.log("this is third middleware code", req.url, req.method);
//     res.send("<h1>Welcome to Home Page. this is create by Vikash Kumar Sharma</h1>")
// })


app.get("/",(req,res,next)=>{
    console.log("this is fourth middleware code", req.url, req.method);
    res.send("<h1>This is handling page!.</h1>")
});

app.get("/contact-us",(req,res,next)=>{
    console.log("handling get", req.url, req.method);
    res.send(
        `<h1> this is contact page. please fill require details</h1>
        <form action="/contact-us" method="POST">

        <input type="email" name="email" placeholder="enter your email"/>
        <input type="password" name="password" placeholder="enter your password"/>
        <button > submit </button>

        </form>

        `);
});

app.post("/contact-us",(req,res,next)=>{
    console.log("first handling",req.url, req.method,req.body);
    next();
    
});

app.use(bodyParser.urlencoded()); 

app.post("/contact-us",(req,res,next)=>{
    console.log("handling post",req.url, req.method, req.body);
    res.send("<h1>Thanks for your details</h1>")
});







const PORT = 3006;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});