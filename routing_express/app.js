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



const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server running on address http://localhost:${PORT}`);
});