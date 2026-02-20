const {sumRequesthandler} = require('./sum')


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
    else if (req.url === '/calculator'){
        res.setHeader('Content-Type','text/html');
        res.write(`
            <html>
                <head><title>calculator page </title></head>
                <body>
                    <form action="/calculator-result" method="POST">
                        <h1> here is the calculator </h1>
                        <input type="text" placeholder="enter the value" name="first"/>
                        <br/><br/>
                        <input type="text" placeholder="enter the value" name="second"/>
                        <br/><br/>
                        <button>add</button>
                    </form>
                </body>
            </html> 
        `);
        return res.end();
    }
    else if (req.url.toLowerCase() === '/calculator-result' && req.method === 'POST'){
        return sumRequesthandler(req,res);
    
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