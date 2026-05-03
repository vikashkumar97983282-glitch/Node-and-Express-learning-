const express = require('express')
const app = express()
const proxy = require('express-http-proxy')


app.use('/', proxy("http://localhost:3001"));
app.use('/about', proxy('http://localhost:3002'));


app.listen(3000, ()=>{
    console.log(`server is running http://localhost:3000`);
})