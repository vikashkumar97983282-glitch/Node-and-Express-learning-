const express = require('express')
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// ejs config
app.set('view engine','ejs');


app.use((req,res,next)=>{
    console.log("this is middleware!");
    next();
})

app.get("/",(req,res)=>{
    res.render("index")
    console.log("this is main folder")
})

app.get("/home",(req,res)=>{
    res.send("this is home page");
    console.log("this is home page");
})

app.get("/about",(req,res)=>{
    res.send("this is our about page! this is testing for api");
    console.log("this is testing ")
})




app.use((req,res)=>{
    res.status(404).send("<h1>File not found</h1>")
})





const port = 3002;
app.listen(port,()=>{
    console.log(`server running on address http://localhost:${port}`)
});