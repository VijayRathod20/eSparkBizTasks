const express = require('express');
const mysql = require('mysql2');
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const e = require('express');
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_application",
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to database");
  });

app.get('/exel',(req,res)=>{
    db.query("select * from users",(err,users)=>{
        if(err) throw err;
   
    res.render("exel",{users});
});
})

app.post('/save',(req,res)=>{
  const id = req.query.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
//   db.query('UPDATE users SET first_name = ?, last_name=?, gender=?,email=?,phone=? WHERE id = ?', [first_name,last_name,gender,email,phone,id], (error, results) => {
//     if (error) throw error;
db.query(`delete from users where id=${id}`,(err,result)=>{
    if(err) throw err;
    res.redirect('/exel');
    
  })
})