
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'stock5861!',
  database:`test`,
  port: 3316,
})

function dbconn(){
  console.log('test')
  connection.connect();
  connection.query("select * from users",(error,rows,fields)=>{
    if(error) throw error;
    console.log('User info is ',rows)
   
  });
  
  connection.end();
  
}

function insert(){
  connection.connect()
  connection.query("insert into users (name) values ('박종인')",(error,rows,fields)=>{
    if(error) throw error;
    console.log('User info is ',rows)
  })
  connection.end();
}

exports.dbconn = dbconn;
exports.insert = insert;