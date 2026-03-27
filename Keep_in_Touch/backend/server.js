const express = require('express');
const app = express();



app.use((req,res,next)=>{
    console.log("this is testing!");
    // res.send("this is home page")
    next()
})

app.get("/home",(req,res)=>{
    res.send("<h1>welcome to our keep_in_touch")
    console.log("this is first route")
})






const port = 3000;
app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
})