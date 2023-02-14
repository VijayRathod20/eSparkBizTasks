const mysql = require('mysql2');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student_db'

});

conn.connect(function (err) {
    if (err) {
        return;
    } else {
        console.log('conneted to mysql!');
    }
});

app.get('/', (req, res) => {
    conn.query('select * from student_express', (err, result) => {
        if(err) throw err;
        res.render("index", { data: result });
    })
});
app.get('/search', (req, res) => {
    let search = req.query.search || " ";
    res.send(search);
    // const find = ['^','~','@'];
    // const replaceWith = ' ';
    // const result = arr.split(find).join(replaceWith);


    // Example string with special characters
    const myString = String(search);

    // Regular expression to match multiple special characters
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    // Replace the special characters with spaces
    const cleanedString = myString.replace(pattern, ' ');

    // Log the cleaned string to the console
    console.log(cleanedString);

    const arr = cleanedString.split(' ');
    fname = arr[1];
    lname = arr[2];
    
    conn.query(`select * from student_express where first_name like '%${fname}%' and last_name like '%${lname}%'`,(err,result)=>{
        if(err) throw err;
        res.render("index",{data:result})

    });




})

app.listen(3000);