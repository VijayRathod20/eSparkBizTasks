var express = require('express');
var app = express();
var mysql = require('mysql2');

//set ejs as template ingine;
app.set('view engine','ejs');

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


app.get('/record',(req,res)=>{
    var data=[];
    conn.query('select * from student_express order by id limit 0,10',(err,result)=>{
       if(err) throw err;
       data[0] = result;
    });
    conn.query('select * from student_express order by id limit 10,10',(err,result2)=>{
        if(err) throw err;
        data[1] = result2;
        
     });
     conn.query('select * from student_express order by id limit 20,10',(err,result3)=>{
        if(err) throw err;
        data[2] = result3;
        
     });
     conn.query('select * from student_express order by id limit 30,10',(err,result4)=>{
        if(err) throw err;
        data[3] = result4;
        
     });
     conn.query('select * from student_express order by id limit 40,10',(err,result5)=>{
        if(err) throw err;
        data[4] = result5;
        
     });
     conn.query('select * from student_express order by id limit 50,10',(err,result6)=>{
        if(err) throw err;
        data[5] = result6;
        
     });
     conn.query('select * from student_express order by id limit 60,10',(err,result7)=>{
        if(err) throw err;
        data[6] = result7;
        
     });
     conn.query('select * from student_express order by id limit 70,10',(err,result8)=>{
        if(err) throw err;
        data[7] = result8;
        
     });
     conn.query('select * from student_express order by id limit 80,10',(err,result9)=>{
        if(err) throw err;
        data[8] = result9;
        
     });
     conn.query('select * from student_express order by id limit 90,10',(err,result10)=>{
        if(err) throw err;
        data[9] = result10;
        res.render('two_array',{data});
     });
     
  })

  app.listen(8080,console.log('running'));