import http from 'node:http'
import { json } from './middlewares/json.js'

const users = [] // USERS ARE GOING TO BE SAVED IN MEMORY, NOT IN DATABASE

const server =  http.createServer(async (req, res)=> {
    const { method, url } = req
    
    await json(req,res)

    if (method == "GET" && url == '/users') {
        return res.end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users') {
        const {name, email} = req.body
        users.push(
            {
                id: 1,
                name,
                email
            }
        )
        return res.writeHead(201).end() // post success code
    }

    return res.writeHead(404).end() // error code
})

server.listen(3333)