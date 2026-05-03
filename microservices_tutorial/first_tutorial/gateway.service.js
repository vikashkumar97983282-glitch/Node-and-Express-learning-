const express = require('express')
const app = express()
const proxy = require('express-http-proxy')

// default routes 
app.get('/', (req,res)=>{
    res.send("this is Gateway routes!")
});


app.use('/home', proxy("http://localhost:3001"));
app.use('/about', proxy('http://localhost:3002'));


// handling middleware
app.use((req,res)=>{
    res.send("file not found")
})

app.listen(3000, ()=>{
    console.log(`server is running http://localhost:3000`);
})