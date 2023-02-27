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

app.get('/save',(req,res)=>{
  const id = req.query.id;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const email = req.query.email;
  const phone = req.query.phone;
  db.query('UPDATE users SET first_name = ?, last_name=?, gender=?,email=?,phone=? WHERE id = ?', [first_name,last_name,gender,email,phone,id], (error, results) => {
    if (error) throw error;
    console.log("updated!")
  });
})

app.get('/add',(req,res)=>{
  var first_name = req.query.first_name;
  var last_name = req.query.last_name;
  var gender = req.query.gender;
  var email = req.query.email;
  var phone = req.query.phone;

  db.query("insert into users(first_name,last_name,gender,email,phone) value(?,?,?,?,?)",[first_name,last_name,gender,email,phone],(err,result)=>{
    if(err) throw err;
    console.log("inserted")
    res.redirect("exel")
  })
})

app.post('/saveAll',(req,res)=>{
  const id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(id)

  for(let i=0; i<id.length; i++){
    let sql = `update users set first_name='${first_name[i]}',last_name='${last_name[i]}',gender='${gender[i]}',email='${email[i]}',phone='${phone[i]}' where id=${id[i]}`;
    db.query(sql,(err,result)=>{
      if(err) throw err;
      console.log("updated all");
    })
  } 
})