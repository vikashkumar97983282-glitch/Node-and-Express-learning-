const express = require('express');
const app = express();
const bodyparser = require('body-parser')

// body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

// mongoose database 
const UserModel = require('./connection');



app.use((req,res,next)=>{
    console.log("this is testing!");
    console.log("database connected successfully")
    // res.send("this is home page")
    next()
})

app.get("/",(req,res)=>{
    res.send("<h1>WELCOME To Our KEEP_IN_TOUCH</h1>")
    console.log("this is first route")
})

app.get("/create",async (req,res)=>{
    let user = await UserModel.create({
        name : "rahul yadav",
        username : "rahul1234",
        email : "ryadav210@rku.ac.in"
    })
    console.log("Data insert into Database")
    res.send(user)
})

app.get("/show",async (req,res)=>{
    let user = await UserModel.find();
    res.send(user);
    console.log(user)
})


app.get("/update",async (req,res)=>{
    let updateuser = await UserModel.findOneAndUpdate({username:"vikash1234"},{name:"vikash kumar"},{new:true})
    res.send(updateuser)
    console.log("user update successfully!")
})


app.get("/delete",async (req,res)=>{
    let deleteuser = await UserModel.findOneAndDelete({username:"rahul1234"})
    res.send(deleteuser)
    console.log("user deleted successfully!")
})




// this code for error handling
app.use((req,res)=>{
    res.send("file not found")
})


const port = 3000;
app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`);
    console.log("database connected ....")
})