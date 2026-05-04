const express = require('express')

const app = express()


app.get('/', (req,res)=>{
    res.send("this is home page!");
});

app.get('/about', (req,res)=>{
    res.send("this is about page!")
})


// middleware handling
app.use((req,res)=>{
    res.send("file not found!");
})





port = 3000;
app.listen(port, ()=>{
    console.log(`server is running on address http://localhost:3000`);
});