const url = require('url');
let fs = require('fs');

html = {
    render(path, response) {
        fs.readFile(path, null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('URL requested not available');
            } else {
                response.write(data);
            }
            response.end();
        });
    }
}

module.exports = {
    handleRequest(request, response) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        let path = url.parse(request.url).pathname;

        switch(path){
            case '/cars':
                html.render('./views/cars.html', response);
                break;
            case '/dogs':
                html.render('./views/dogs.html', response);
                break;
            case '/cars/new':
                html.render('./views/car_details.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('URL requested not available');
                response.end();
        }
    }
}