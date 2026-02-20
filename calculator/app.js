const http = require('http');
const { requesthandler } = require('./handler');

const server = http.createServer(requesthandler);

const PORT = 4002;

server.listen(PORT,()=>{
    console.log(`server running on address http://localhost:${PORT}`)
})