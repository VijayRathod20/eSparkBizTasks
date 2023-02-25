const { render } = require('ejs');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const util = require("util");
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Database Connection

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'job_application'
});

con.connect((err) => {
    if (err) { console.log(err); }
    console.log("success connection");

});

const sendQuery = util.promisify(con.query.bind(con));

app.get("/showtable",(req,res)=>{

    res.render("test.ejs");
});

app.get("/addstudent",async (req,res)=>{
var studentRec = req.query.studentdata;
studentRecord = studentRec.split(",");
console.log(studentRecord);
 await sendQuery(`insert into users (first_name,last_name,gender,email,phone) value('${studentRecord[0]}','${studentRecord[1]}','${studentRecord[2]}','${studentRecord[3]}','${studentRecord[4]}')`);

});



app.get("/getstudent",async (req,res)=>{
    var studentdata =await sendQuery('select * from users');
    console.log(studentdata);
res.send(studentdata);
});

app.get("/updatestudent",async (req,res)=>{
    var studentRec = req.query.studentdata;
    studentRecord = studentRec.split(",");
    console.log(studentRecord);
     await sendQuery(`UPDATE users SET first_name='${studentRecord[0]}',last_name='${studentRecord[1]}',gender='${studentRecord[2]}',email='${studentRecord[3]}',phone='${studentRecord[4]}' where id = '${studentRecord[5]}'` );
    
    });



app.listen(7878);
