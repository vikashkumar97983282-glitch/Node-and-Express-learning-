const express = require('express')
const app = express()
const morgan = require('morgan')


app.use(morgan('dev'))

app.get("/", (req,res)=>{
    for (let i=0; i<1000000000; i++){

    }
    res.send("this is about page. running");
});


app.listen(3002, ()=>{
    console.log(`server is running on http://localhost:3002`);
})