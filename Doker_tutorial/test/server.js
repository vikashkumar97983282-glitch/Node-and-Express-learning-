const express = require('express')
const app = express()
const path = require('path')
const MongoClient = require("mongodb").MongoClient;

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);


app.get('/getUsers', async (req,res)=>{
    await client.connect(URL);
    console.log("database connected to successfully!");

    const db = client.db("docker_test_db");
    const data = await db.collection("users").find({}).toArray();
    client.close();
    res.send(data);
});

app.get('/addUser', async (req,res)=>{
    const userObj = req.body;
    console.log(req.body);
    await client.connect(URL);
    console.log("connected successfully to server!");
    
    const db = client.db("docker_test_db");
    const data = await db.collection("users").insertOne(userObj);
    console.log(data);
    console.log("data insert in DB");
    client.close();
    res.send(data)
})


// middleware handling
app.use((req,res)=>{
    res.send("file not found!");
})





port = 3000;
app.listen(port, ()=>{
    console.log(`server is running on address http://localhost:${port}`);
});