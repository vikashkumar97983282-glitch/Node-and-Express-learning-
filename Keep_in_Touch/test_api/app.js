const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const usermodel = require('./connection/connection');

// middleware
app.get("/",(req,res)=>{
    console.log("welcome to my api");
    res.send("welcome users's")
})

// fetch data home page
app.get("/users",async (req,res)=>{
    let data = await usermodel.find();
    res.send(data);
    console.log("data sent successfully!")
})

// add users
app.post("/add",async (req,res)=>{

    const {name,age,email} = req.body

    const data = await usermodel.create({
        name : name,
        age : age,
        email : email
    })
    res.send("user added successfully");
    console.log("user added successfully!")
})

// delete user
app.post("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    try {
        await usermodel.deleteOne({_id:id});
        res.send("user deleted successfully");
        console.log("user deleted successfully!")
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");

    }
})

// update user
app.post("/update/:id",async (req,res)=>{
    let id = req.params.id;
    let {name,age,email} = req.body;

    try{
        const update = await usermodel.findOneAndUpdate({_id:id},{name,age,email},{returnDocument:"after"});
        res.send(update);
        console.log("user update successfully")

    } catch(error){
        console.error("error update user",error);
        res.status(500).send("error update user")
    }
})







const port = 3000;


app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
})