// External modules
const express = require('express');

// local modules
const userRouter = require('./routing/userRouter')
const hostRouter = require('./routing/hostRouter')

const app = express();

app.use((req,res,next)=>{
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded());

app.use(userRouter);
app.use(hostRouter);



const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server running on address http://localhost:${PORT}`);
});