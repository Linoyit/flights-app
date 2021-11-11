
const http = require('http');
const fs = require('fs');


console.log(__filename, module, global)

http.createServer(function (req, res) {
    let fileName = req.url;
    let end = checkEnd(fileName);
    let contentType = readUrl(end);
    
    if (end === 'json') {
        fs.readFile('client/data.json', function(err, data) {
            
            const flights = JSON.parse(data);
            res.writeHead(200, {'Content-Type': contentType});
            res.write(JSON.stringify(flights));
            res.end();
        })
    } else if (end === 'css') {
        fs.readFile('client/stylesheet.css', function(err, data) {
            console.log("trying to catch css file");
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        })
    }
    else{
        fs.readFile('client/flights.html', function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        })
    }
}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});

function checkEnd(fileName){
    let index = fileName.lastIndexOf('.');
    return fileName.substr(index+1);
}

function readUrl(end){
    switch(end){
        case 'json': 
            return 'application/json';
        case 'html': 
            return 'text/html';
        case 'css': 
            return 'text/css';
        case 'js': 
            return 'text/javascript';
        default:
            return 'text/html';
    } 
}
    