const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (req,res)=>{
    res.send("this is home page");
});

app.get("/hello", (req,res)=>{
    res.send("welcome to our page. visite agian!");
});




const port = 3001;

app.listen(port, ()=>{
    console.log(`server running on address http://localhost:3001`);
});