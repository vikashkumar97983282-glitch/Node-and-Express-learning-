// External modules
const express = require('express');

// local modules
const userRouter = require('./routing/userRouter');
const hostRouter = require('./routing/hostRouter');
const aboutRouter = require('./routing/aboutRouter')

const app = express();

// parsing body
app.use(express.urlencoded());

app.use(userRouter);
app.use(hostRouter);
app.use(aboutRouter);


//handling page 
app.use((req,res,next)=>{
    res.status(404).send("<h1>404 page not found!</h1>")
})



const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server running on address http://localhost:${PORT}`);
});