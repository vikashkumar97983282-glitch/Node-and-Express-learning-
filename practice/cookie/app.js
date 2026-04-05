const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser());


app.get('/', (req,res)=>{
    let token = jwt.sign({email:"vikash@gmail.com"}, "secretkey");
    res.cookie("token", token );
    res.send("cookie is set")
})

app.get("/home", (req,res)=>{
    let token = req.cookies.token;
    let data = jwt.verify(req.cookies.token, "secretkey");
    console.log(data)
})




const port = 3001;
app.listen(port, ()=>{
    console.log(`server is running on address http://localhost:${port}`);
})