const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req, res) =>{
    if(req.url === '/'){
        fs.readFile('./index.html', (err, data) =>{
            if(err){
                res.writeHead(404)
                res.write('Error: File Not Found')
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                console.log('worked')
                res.end()
            }
        })
    } else if(req.url === `${req.url}`){
        fs.readFile(`.${req.url}`, (err, data) =>{
            if(err){
                console.log('Error: File Not Found', err)
                res.end()
            } else {
                console.log(req.url)
                res.write(data)
                res.end()
            }
        })
    }
})

server.listen(port, err =>{
    if(err){
        console.log('something went wrong', err)
    } else {
        console.log(`server is listening on port ${port}`)
    }
})