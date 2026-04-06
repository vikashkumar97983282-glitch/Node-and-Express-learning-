require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


// local modules import 
const homeRoutes = require("./routes/homeroutes")



app.use(cors());
app.use(bodyParser.json({extended:true}));

app.get("/",(req,res)=>{
    console.log("middleware working!")
    res.send("welcome to my server!")
})

app.use("/api",homeRoutes);



const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`)
})


