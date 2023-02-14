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

app.get("/search", (req, res) => {
    var searchValue = req.query.search || ' ';
    var multi = req.query.multi
    // if(req.query.search){
    //     searchValue = req.query.search
    // }else{
    //     searchValue=""
    // }
    
    var arr = [], arr2 = [], symbol = []

    var fName, lName, sEmail

    for (var i = 0; i < searchValue.length; i++) {
        if (searchValue[i] == '^' || searchValue[i] == '~' || searchValue[i] == '@') {
            arr.push(i)
            symbol.push(searchValue[i])
        }
    }
    console.log("String :- " + searchValue)
    console.log("array :- " + arr)

    for (var i = 0; i < arr.length; i++) {
        arr2.push(searchValue.substring(arr[i] + 1, arr[i + 1]))
    }
    var sql = `select * from student_express where `
    if (multi == 'and') {
       
        console.log(arr2)
        for (var i = 0; i < symbol.length; i++) {
            if (symbol[i] == '^') {
                fName = arr2[i]
                sql += `first_name="${fName.trim()}" and `
            }
            else if (symbol[i] == '~') {
                lName = arr2[i]
                sql += `last_name="${lName.trim()}" and `
            }
            else if (symbol[i] == '@') {
                sNumber = arr2[i]
                sql += `email="${sEmail.trim()}" and `
            }
        
        }
        sql = sql.slice(0, (sql.length - 5))
    }else{
        
        console.log(arr2)
        for (var i = 0; i < symbol.length; i++) {
            if (symbol[i] == '^') {
                fName = arr2[i]
                sql += `first_name="${fName.trim()}" `
                sql +='or '
            }
            else if (symbol[i] == '~') {
                lName = arr2[i]
                sql += `last_name="${lName.trim()}" `
                sql +='or '
            }
            else if (symbol[i] == '@') {
                sNumber = arr2[i]
                sql += `email="${sNumber.trim()}" `
                sql +='or '
            }
           
        }
        sql = sql.slice(0, (sql.length - 3))
        console.log(sql)
    }
    conn.query(sql, (err, result) => {
        //res.render('esearch',{searchResult:result})
        if (err) throw err;
        console.log(result)
        res.render('test', { data: result, searchValue })
    })
})
app.listen(5000);