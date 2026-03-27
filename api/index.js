const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs')


// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// ejs config
app.set('view engine','ejs');
// path
app.use(express.static(path.join(__dirname,'public')));


app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index", {files:files})
    });
    
})


// app.use((req,res,next)=>{
//     console.log("this is middleware!");
//     next();
// })

// app.get("/",(req,res)=>{
//     res.render("index")
//     console.log("this is main folder")
// })

// app.get("/home",(req,res)=>{
//     res.send("this is home page")
// })

// // dynamic path
// app.get("/home/:anythings",(req,res)=>{
//     // use params from user search in anythings
//     res.send(req.params.anythings)
// })

// // two values use in params
// app.get("/home/:anythings/:value",(req,res)=>{
//     res.send(`welcome ${req.params.anythings} ${req.params.value}`)
// })






// // error show 
// app.use((req,res)=>{
//     res.status(404).send("file not found!")
// })

const port = 3002;
app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
});