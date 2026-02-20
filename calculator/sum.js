const { buffer } = require("node:stream/consumers");

const sumRequesthandler = (req,res)=>{
    console.log("hello",req.url);
    const body = [];
    req.on('data',chunk=> body.push(chunk));
    req.on('end',()=>{
        const bodystr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodystr);
        const bodyobj = Object.fromEntries(params);
        const result = Number(bodyobj.first) + Number(bodyobj.second);
        console.log(result);
        res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title>calculator page </title></head>
                <body>
                    <h1> your result is ${result} </h1>
                    <a href="calculator">go to calculator</a>
                </body>
            </html> 
        `);
        return res.end();
    })
}

exports.sumRequesthandler = sumRequesthandler;