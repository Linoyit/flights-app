
const http = require('http');
const fs = require('fs');

function getFileExtension(str) {
    let extension = '';
    let i = str.length - 1;
    while (str.charAt(i) !== '.') {
        extension = str.charAt(i) + extension;
        i--;
    }
    return extension;
}

http.createServer(function (req, res) {
    suffix = getFileExtension(req.url);
    console.log(suffix);
    const file = {
        name: '',
        type: ''
    }
    switch (suffix) {
        case 'js':
            file.name = 'reverseString.js';
            file.type = 'text/javascript';
            break;
        case 'css':
            file.name = 'stylesheet3.css';
            file.type = 'text/css';
            break;
        case 'html':
            file.name = 'day5.html';
            file.type = 'text/html';
            break;
        default:
            file.name = 'day5.html';
            file.type = 'text/html';
            break;
    }
    fs.readFile(file.name, function(err, data) {
        res.writeHead(200, {'Content-Type': file.type});
        res.write(data);
        res.end();
    });

}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});
