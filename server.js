
const http = require('http');
const fs = require('fs');


console.log(__filename, module, global)

http.createServer(function (req, res) {
    let fileName = req.url;
    let end = checkEnd(fileName);
    switch (end) {
        case 'html': { 
            fs.readFile('client/flights.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }); 
            break;
        } 
        case 'css': { 
          
            break;
        } 
        case 'js': { 
            
            break;
        } 
        case 'json': { 
            console.log('in json');
            fs.readFile('client/data.json', function(err, data) {
                const flights = JSON.parse(data);
                console.log(flights);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(flights));
                res.end();
            }); 
            break;
        } 
        default: {
            fs.readFile('client/flights.html', function(err, data) {
                console.log('end: ',end);
                console.log('in html');
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }); 
            break;
        }
    }
}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});

function checkEnd(fileName){
    let index = fileName.lastIndexOf('.');
    return fileName.substr(index+1);
}