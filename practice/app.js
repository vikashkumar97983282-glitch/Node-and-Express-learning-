const http = require('http');

const server = http.createServer();

const PORT = 4003;

server.listen(PORT,()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
});