const requesthandler = (req,res)=>{
    console.log(req.url,req.method)

    if (req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title>calculator page </title></head>
                <body>
                    <h1> welcome to calculator </h1>
                    <a href="calculator">go to calculator</a>
                </body>
            </html> 
        `);
        return res.end();
    }

     res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title> calculator page </title></head>
                <body>
                    <h1> 404 content not available </h1>
                    <a href="calculator">go to calculator</a>
                </body>
            </html> 
        `);
        return res.end();
};

exports.requesthandler = requesthandler;