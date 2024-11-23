const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req, res) =>{
  const ext = req.url.split('.')[1]
  console.log(req.url)
  if(ext == 'js'){
    fs.readFile(`../${req.url}`, (err, data) =>{
      if(err){
        res.writeHead(404)
        res.write(`Error: File Not Found`)
      } else {
        res.writeHead(200, {'Content-Type' : 'text/javascript'})
        res.write(data)
      }
      res.end()
    })
  } else if(ext === undefined){
    fs.readFile('../index.html', (err, data) =>{
      if(err){
        res.writeHead(404)
        res.write(`Error: File Not Found ${err}`)
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
      }
      res.end()
    })
  } else if(req.url == `${req.url}`){
    fs.readFile(`../${req.url}`, (err, data) =>{
      if(err){
        console.log(`Error: File Not Found ${err}`)
      } else {
        res.write(data)
      }
      res.end()
    })
  }
})

server.listen(port, err =>{
  if(err){
    console.log(`Something went wrong ${err}`)
  } else {
    console.log(`Server listening on port ${port}`)
  }
})