const http = require('http')
const fs = require('fs')

const dbconn = require("./dbconn")

const server = http.createServer((req,res)=>{
  if(req.method === 'POST'){
    if(req.url === '/test'){
      fetch("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/shelter?upr_cd=6110000&org_cd=3220000&_type=json&serviceKey=Y3xk5GdqAmLU%2ByM2w%2B%2FDGeWlYJeg28IL6pJiaHim50IOTs6ZeJNIGpJ%2BqSpkKVMAn67uzeHJV5mg9%2BsfOQe9TQ%3D%3D")
      .then((response)=>response.json())
      .then((response)=>{
        let data = response.response.body.items.item
        console.log(data)
        fs.writeFileSync('test.json',JSON.stringify(data),(err)=>{
          if(err)
          console.log(err)
          else{
            console.log('s')
          }
        })
      })
      .then(()=>{
        res.writeHead(302,{Location:"http://localhost:5000"});
        res.end();
        // dbconn.dbconn();
        dbconn.insert();
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


