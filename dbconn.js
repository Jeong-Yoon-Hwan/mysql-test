
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

function sidoInsert(data){
  connection.connect()
  for(let i=0; i<data.length;i++){
    connection.query(`INSERT INTO sido (orgCd, orgdownNm)
    SELECT '${data[i].orgCd}', '${data[i].orgdownNm}' FROM DUAL
    WHERE NOT EXISTS
    (SELECT orgCd, orgdownNm FROM sido
     WHERE orgCd = '${data[i].orgCd}' AND orgdownNm = '${data[i].orgdownNm}' )`,(error,rows,fields)=>{
      if(error) throw error;
      console.log('User info is ',rows)
    })
  }
  connection.end();
}

exports.dbconn = dbconn;
exports.sidoInsert = sidoInsert;