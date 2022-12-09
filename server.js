const http = require('http')
const fs = require('fs')

require('dotenv').config();
console.log("DB: ",process.env.SECRET_KEY)

const dbconn = require("./dbconn")
const apiData = require("./data")

const server = http.createServer((req,res)=>{
  if(req.method === 'POST'){
    if(req.url === '/test'){
      
      let result;
      fetch(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=50&pageNo=1&_type=json&serviceKey=${process.env.SECRET_KEY}`)
      .then((response)=>response.json())
      .then((response)=>{
        result = response.response.body.items.item
        console.log(result)
        dbconn.sidoInsert(result);
      }).then(()=>{
        res.writeHead(302,{Location:"http://localhost:5000"});
        res.end();
      })
      
    }
  }
  if(req.method === 'GET'){
    if(req.url.endsWith(".js")){
      let js = fs.readFileSync('.'+req.url,'utf-8');
      res.writeHead(200,{"Content-Type":"text/javascript"})
      res.end(js)
    } else {
      res.writeHead(200)
      res.end(fs.readFileSync('index.html'))
    }
  }

  

  
})

server.listen(5000,()=>{
  console.log('server run...')
})

