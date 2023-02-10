var express = require("express");
var app = express();
var mysql = require("mysql2");

//set ejs as template ingine;
app.set("view engine", "ejs");

var VariableString = "This is Variable";

// use res.render to load up an ejs view file
app.get("/hello", (req, res) => {
  res.render("home", { variable: VariableString });
});

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
// app.get('/data',(req,res)=>{
//    conn.query('select * from student_express order by id limit 0,10',(err,result)=>{
//       if(err) throw err;
//       res.render('table',{data:result})
//    });
// })
// app.get('/:page', (req, res) => {
//    let page = parseInt(req.params.page) || 1;
//    let limit = 10;
//    let offset = (page - 1) * limit;

//    if (isNaN(offset)) {
//       offset = 0;
//     }0

//    conn.query(`SELECT * FROM student_express LIMIT ${offset}, ${limit}`, (err, result) => {
//      if (err) throw err;
//      res.render('table', { data: result,pages:page});
//    });
//  });

// app.get("/:page", (req, res) => {
//   let pag = parseInt(req.params.page) || 1;
//   let limit = 10;
//   let offset = (pag - 1) * limit;
 

//   conn.query(
//     `SELECT * FROM student_express LIMIT ${offset}, ${limit}`,
//     (err, result) => {
//       if (err) throw err;

//       conn.query(
//         "SELECT COUNT(*) as count FROM student_express",
//         (err, countResult) => {
//           if (err) throw err;
//           let totalPages = Math.ceil(countResult[0].count / limit);

//           let pages = [];
//           for (let i = 1; i <= totalPages; i++) {
//             pages.push(i);
//           }

//           res.render("table", {
//             data: result,
//             page: pag,
//             pages: pages,
//           });
//         }+
//       );
//     }
//   );
// });

app.get("/:page/:sort/:order", (req, res) => {
  var pag = parseInt(req.params.page) || 1;
  var limit = 10;
  var offset = (pag - 1) * limit;
  var sortBy = req.params.sort || 'first_name';
  var sortOrder = req.params.order;
  
  

  conn.query(
    `SELECT * FROM student_express order by ${sortBy} ${sortOrder} LIMIT ${offset}, ${limit}`,
    (err, result) => {
      if (err) throw err;

      conn.query(
        "SELECT COUNT(*) as count FROM student_express",
        (err, countResult) => {
          if (err) throw err;
          let totalPages = Math.ceil(countResult[0].count / limit);

          let pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }

          res.render("table", {
            data: result,
            page: pag,
            pages: pages,
            sort: sortBy,
            order:sortOrder
          });
        }
      );
    }
  );
  console.log(pag);
console.log(sortBy);
console.log(sortOrder);
});



app.listen(8090);
console.log("Server is listening on port 8090");
