
const http = require('http');
const fs = require('fs');
const url = require('url');
// console.log(__filename, module, global)

let query = new Map();
//TODO(1): how to show entire table after filtering. 

function parseQuery(query) { //'from=barcelona'
    let result = new Map();
    let params = [query];
    if (query.includes('&')) {
        params = query.split('&'); //['from=barcelona', 'to=rome', 'by=elal']
    }
    console.log('params array:', params);
    for (let i = 0; i < params.length; i++) {
        let list = params[i].split('=');
        if (list[1] !== ''){
            result.set(list[0], list[1]); // { 'from':'barcelona', 'to':'rome'...  }
        }
    }
    return result;
}

function getFileName(fileName) {
    if (fileName.includes('?')) {
        let arr = fileName.split('?');
        query = parseQuery(arr[1]);
        fileName = arr[0];
    }
    return fileName;
}

http.createServer(function (req, res) {
    let fileName = req.url;
    fileName = getFileName(fileName);
    let end = checkEnd(fileName);
    let contentType = readUrl(end);
    
    if (end === 'json') {
        fileName = '/data.json';
    } else if (fileName === '/') {
        fileName = '/flights.html';
    }

    fs.readFile('client' + fileName, function(err, data) {
        
        if (err) {
            if (err.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Resource no found');
              } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Server Error');
              }
        } else {
            if (end === 'json') {
                const flights = JSON.parse(data);
                let filtered = filterFlights(flights);
                res.writeHead(200, {'Content-Type': contentType});
                res.write(JSON.stringify(filtered));

            } else {
                res.writeHead(200, {'Content-Type': contentType});
                res.write(data);
            }
        }
        res.end();
    })

}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});


function checkEnd(fileName){
    let address = fileName.split('?')[0]; // flights.html
    let index = address.lastIndexOf('.');
    return address.substr(index+1);
}

function filterFlights(flights) {
    let filtered = flights;

    if (query.has('from')) {
        filtered = filtered.filter(flight => flight.from === query.get('from'));
    } 
    if (query.has('to')) {
        filtered = filtered.filter(flight => flight.to === query.get('to'));
    }
    return filtered;
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
    