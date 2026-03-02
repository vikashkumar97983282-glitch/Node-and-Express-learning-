const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3002;

const homerouter = require('./page/home');
const aboutrouter = require('./page/about');
const cors = require('cors')


app.use(bodyParser.urlencoded());
app.use(cors())



app.use(homerouter);
app.use(aboutrouter);

app.use((req,res,next)=>{
    res.status(404).send("<h1>404 file not found!</h1>");
});



app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`);
});