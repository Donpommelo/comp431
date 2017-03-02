const http = require('http');

const host = '127.0.0.1';
const port = 3333 || process.env.PORT;

http.createServer(preprocess).listen(port, host);
console.log(`Server running at http://${host}:${port}`);

function preprocess(req, res) {
    let body = '';
    req.on('data', function(chunk) {
        body += chunk
    });
    req.on('end', function() {
        req.body = body;
        server(req, res)
    })
}

function server(req, res) {
    console.log('Request method        :', req.method);
    console.log('Request URL           :', req.url);
    console.log('Request content-type  :', req.headers['content-type']);
    console.log('Request payload       :', req.body);

    const payload = { 'hello': 'world' };
    const articles = {articles:
        [{id:1, author:"Scott", body:'A post'},
        {id:2, author:"Charlos", body:'Another post'},
        {id:3, author:"Bodardus", body:'Decidedly not a post'}]};

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    if (req.method == 'GET' && req.url == '/articles') {
        res.end(JSON.stringify(articles))
    }

    if (req.method == 'PUT' && req.url == '/logout') {
        res.end('OK')
    }

    if (req.method == 'POST' && req.url == '/login') {
        if (req.body && JSON.parse(req.body).username && JSON.parse(req.body).password) {
            const loginMessage = {
                username: JSON.parse(req.body).username,
                password: JSON.parse(req.body).password
            };
            res.end(JSON.stringify(loginMessage))
        }
    }

    if (req.method == 'GET' && req.url == '/') {
        res.end(JSON.stringify(payload))
    }

    res.end('Error. Not a valid command.');
}
