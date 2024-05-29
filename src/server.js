import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './middlewares/routes.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    
    await json(req, res);

    const route = routes.find(route => {
        return method === route.method && route.path.test(url);
    });

    if (route) {
        const routeParams = req.url.match(route.path);
        req.params = {...routeParams.groups}; // Adding params to the request object for easy access
        
        console.log(routeParams);
        
        return route.handler(req, res);
    }

    return res.writeHead(404).end(); // error code
});

server.listen(3333);
