const http = require('http');
const requesthandler = require('./handler');


const server = http.createServer(requesthandler);

const PORT = 3005;

server.listen(PORT,()=>{
    console.log(`sever running on http://localhost:${PORT}`);
});