var express = require("express");
var app = express();
var mysql = require("mysql2");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
const { json } = require("express");
//set ejs as template ingine;
app.set("view engine", "ejs");

const conn = mysql.createConnection({
    host: "localhost",
    database: "student_db",
    user: "root",
    password: "root",
});
conn.connect(function (err) {
    if (err) throw err;
    else console.log("connected!");
});


app.get('/', (req, res) => {
    conn.query("select * from student_express", (err, result) => {
        if (err) return;
        res.render("search", { data: result });
    });

});


app.get('/search', (req, res) => {
    const search = req.query.search;
    let arr = search.split('.');
    

    let firstname = arr[0];
    let lastname = arr[1];
    let email = arr[2];

    const query = `
  SELECT * FROM student_express
  WHERE first_name LIKE '%${firstname}%'
  AND last_name LIKE '%${lastname}%'
  AND email LIKE '%${email}'
  `;
    conn.query(query, (err, result) => {
        if (err) throw err;
        res.render("search", { data: result });
    })

})





app.listen(8080);