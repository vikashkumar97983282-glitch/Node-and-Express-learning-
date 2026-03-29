const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const usermodel = require('./connection/connection');


app.get("/",(req,res)=>{
    console.log("welcome to my api");
    res.send("welcome users's")
})


app.get("/users",async (req,res)=>{
    let data = await usermodel.find();
    res.send(data);
})


app.post("/add",async (req,res)=>{

    const {name,age,email} = req.body

    const data = await usermodel.create({
        name : name,
        age : age,
        email : email
    })
    res.send("user added successfully");
})




const port = 3000;


app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
})