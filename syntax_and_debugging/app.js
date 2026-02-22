const http = require('http');
const syntaxTesting = require('./syntax');
const Hello = require('./hello');

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);
    syntaxTesting();
    Hello();
});

const PORT = 3005;

server.listen(PORT,()=>{
    console.log(`sever listening on http://localhost:${PORT}`);
});