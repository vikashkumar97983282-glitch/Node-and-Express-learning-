// quiet:true is used to avoid showing warning message in console.
require('dotenv').config({quiet:true});
const express = require('express');
const app = express();




// local modules import 
const adminRoutes = require("./routes/adminroutes")
const clientRoutes = require("./routes/clientroutes")
const companyRoutes = require("./routes/companyroutes")

// database connection
const db = require("./config/database_connection")



app.get("/",(req,res)=>{
    res.send("this is home page ");
})

app.use("/admin",adminRoutes)
app.use("/client",clientRoutes)
app.use("/company",companyRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})