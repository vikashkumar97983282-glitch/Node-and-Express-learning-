const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express())
app.use(express.urlencoded({extended:true}))


app.get("/", (req,res)=>{
    for (let i=0; i<1000000000; i++){

    }
    res.send("this is home page");
});

app.get("/about", (req,res)=>{
    for (let i=0; i<1000000000; i++){

    }
    res.send("this is about page");
});




const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on address http://localhost:3000`)
});