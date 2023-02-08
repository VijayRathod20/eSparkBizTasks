var express = require('express');
var app = express();
var mysql = require('mysql2');
var Promise = require('promise');


//set ejs as template ingine;
app.set('view engine','ejs');

var VariableString = "This is Variable";

// use res.render to load up an ejs view file
app.get('/hello',(req,res)=>{
   res.render('home',{variable:VariableString});
});

const  conn  = mysql.createConnection({
   host:'localhost',
   database:'student_db',
   user:'root',
   password:'root'
});
conn.connect(function(err){
   if(err) throw err;
   else console.log("connected!");
});
// app.get('/data',(req,res)=>{
//    conn.query('select * from student_express order by id limit 0,10',(err,result)=>{
//       if(err) throw err;
//       res.render('table',{data:result})
//    });
// })
app.get('/:page', (req, res) => {
   let page = parseInt(req.params.page) || 1;
   let limit = 10;
   let offset = (page - 1) * limit;

   if (isNaN(offset)) {
      offset = 0;
    }
 
   conn.query(`SELECT * FROM student_express LIMIT ${offset}, ${limit}`, (err, result) => {
     if (err) throw err;
     res.render('table', { data: result,pages:page});
   });
 });
 
app.listen(8090);
console.log('Server is listening on port 8090');
