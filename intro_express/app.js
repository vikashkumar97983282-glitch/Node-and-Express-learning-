const express = require('express');

const app = express();

// adding middleware
app.use((req,res,next)=>{
    console.log("this is first middleware ",req.url, req.method);
    next();
});

app.use((req,res,next)=>{
    console.log("this is second middleware", req.url, req.method);
    res.send("<p>welcome to home page. this is created by vikash kumar sharma</P>")
});




const PORT = 3005;
app.listen(PORT,()=>{
    console.log(`sever running on http://localhost:${PORT}`);
});