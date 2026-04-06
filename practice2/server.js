const express = require('express');
const app = express();



app.get('/', (req,res)=>{
    console.log("middleware executed");
    res.send("Hello Programmers");
})



const port = 5000;
app.listen(port , ()=>{
    console.log(`server is running on address http://localhost:${port}`)
})