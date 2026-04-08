const express = require('express');
const app = express();
require('dotenv').config({quiet: true});
const bcrypt = require('bcrypt');




app.use(express.json());
app.use(express.urlencoded({extended:true}))


// connecting to database
require('./config/db');

// importing models
const userModel = require('./model/user');
const productModel = require('./model/product');
const adminModel = require('./model/admin');



// importing routes
const userRoutes = require('./routes/userroutes');
const productRoutes = require('./routes/productroutes');
const adminRoutes = require('./routes/adminroutes');


// middlewares
app.get('/', (req,res)=>{
    console.log("middleware executed");
    res.send("Hello Programmers");
});


app.use('/user', userRoutes);
app.use('/product',productRoutes);
app.use('/admin', adminRoutes);







// starting the server
const port = process.env.port;
app.listen(port , ()=>{
    console.log(`server is running on address http://localhost:${port}`)
})