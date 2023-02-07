const mysql = require('mysql2');
const express  = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

const conn = mysql.createConnection({
    host:'localhost',
    database:'student_db',
    user:'root',
    password:'root'
});

conn.connect(function(err){
    if(err) throw err;
    console.log('connected');
})

app.get('/get',(req,res) => {
    const query = conn.query('select * from student_master',(err,value)=>{
        if(err) throw err;
        res.json(value);
    })
});

app.post('/post',(req,res)=>{

    const query = conn.query("insert into student_master(first_name,last_name,collage_id,city,email,contact_no,collage_name) values('hello','how',1,'mahuva','hello@gmail.com',78954621,'SPU')");
    res.send('success');
})


