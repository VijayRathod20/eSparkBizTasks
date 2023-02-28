const express = require("express");
const app = express();
app.set("view engine", "ejs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
app.listen(8080);
app.use(bodyParser.json());

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the database connection
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

// Set up the route for the job application form
app.get("/", (req, res) => {
  db.query("SELECT * FROM state_master", (err, states) => {
    if (err) {
      throw err;
    }

    db.query(
      "SELECT option_name FROM option_master where select_id = 2",
      (err, rel) => {
        if (err) {
          throw err;
        }
        db.query(
          "SELECT option_name FROM option_master where select_id = 3",
          (err, location) => {
            if (err) {
              throw err;
            }

            db.query(
              "SELECT option_name FROM option_master where select_id = 4",
              (err, department) => {
                if (err) {
                  throw err;
                }
                db.query(
                  "SELECT option_name FROM option_master where select_id = 5",
                  (err, courses) => {
                    if (err) {
                      throw err;
                    }
                    db.query(
                      "SELECT option_name FROM option_master where select_id = 6",
                      (err, languages) => {
                        if (err) {
                          throw err;
                        }
                        db.query(
                          "SELECT option_name FROM option_master where select_id = 7",
                          (err, technologies) => {
                            if (err) {
                              throw err;
                            }

                            // Render the job application form and pass the data for the select boxes to the template
                            res.render("job_form", {
                              states: states,
                              relation: rel,
                              location: location,
                              dep: department,
                              course: courses,
                              language: languages,
                              tec: technologies,
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});



app.get('/cities', (req, res) => {
  const stateId = req.query.stateId;
  db.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, cities) => {
    if (error) {
      console.error('Error fetching cities: ', error);
      res.sendStatus(500);
    } else {
      res.json(cities);
    }
  });
});




app.post("/submit", (req, res) => {

  const data = req.body;
  const course = req.body.course;
  const board = req.body.board;
  const passingyear = req.body.passingYear;
  const pr = req.body.percentage;
  console.log(course);
  console.log(board);
  console.log(passingyear);
  console.log(pr);
  const state = req.body.state;
  const city = req.body.city;
  let stateName = '';
  console.log(city);
 

    const basicSql = `INSERT INTO basic_info (first_name,last_name,gender,dob,job_designation,address1,email,phone,city,state,zip,relation_status)
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    const basicValue = [
      data.first_name,
      data.last_name,
      data.gender,
      data.dob,
      data.job_designation,
      data.address1,
      data.email,
      data.phone,
      data.city,
      state,
      data.zip,
      data.relation_status,
    ];
    db.query(basicSql, basicValue, (err, result) => {
      if (err) {
        throw err;
      }

      //
      const applicantId = result.insertId;

      if (typeof (course, board, passingyear, pr) == "string") {
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

        db.query(eduSql, (err, result) => {
          if (err) throw err;
          console.log("edu inserted");
        });
      } else {
        for (i = 0; i < course.length; i++) {
          eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

          db.query(eduSql, (err, result) => {
            if (err) throw err;
            console.log("edu inserted");
          });
        }
      }

      const c_name = req.body.company_name;
      const desig = req.body.jobtitle;
      const start = req.body.start_date;
      const end = req.body.end_date;
      console.log(c_name);
      console.log(desig);
      console.log(start);
      console.log(end);
      if (typeof (c_name, desig, start, end) == "string") {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log("exp inserted");
        });
      } else {
        for (i = 0; i < c_name.length; i++) {
          expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

          db.query(expSql, (err, result) => {
            if (err) throw err;
            console.log("exp inserted");
          });
        }
      }


      //languages insert
      var lang = req.body.Language;
      var r = req.body[lang + "read"] ? "yes" : "no";
      var w = req.body[lang + "write"] ? "yes" : "no";
      var s = req.body[lang + "speak"] ? "yes" : "no";
      console.log(lang);
      console.log(r);
      if (typeof lang == "string") {
        var query_lan =
          "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)";
        db.query(query_lan, [applicantId, lang, r, w, s], (err, ans) => {
          if (err) return console.log(err.message);
          console.log("languages inserted");
        });
      } else {
        lang.forEach((language) => {
          const read2 = req.body[language + "read"] ? "yes" : "no";
          const write2 = req.body[language + "write"] ? "yes" : "no";
          const speak2 = req.body[language + "speak"] ? "yes" : "no";

          db.query(
            "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)",
            [applicantId, language, read2, write2, speak2],
            (err, result) => {
              if (err) {
                throw err;
              }

              console.log("language inserted");
            }
          );
        });
      }

      //getting technology
      const skills = req.body.technology;
      const lavel = req.body[skills + "a"];
      console.log("skills " + skills);
      if (typeof skills == "string") {
        db.query(
          "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
          [applicantId, skills, lavel],
          (err, result) => {
            if (err) throw err;
            console.log("skills one inserted");
          }
        );
      } else {
        skills.forEach((tec) => {
          const lavel = req.body[tec + "a"];
          console.log("lavel " + lavel);
          db.query(
            "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
            [applicantId, tec, lavel],
            (err, result) => {
              if (err) throw err;
              console.log("skills inserted");
            }
          );
        });
      }

      //getting references
      const rname = data.rname;
      const rcontact = data.rcontact;
      const relation = data.relation;
      console.log(rname);
      console.log(rcontact);
      console.log(relation);
      for (let i = 0; i < rname.length; i++) {
        db.query(
          `insert into reference(applicant_id,rname,rcontact,relation) 
      values('${applicantId}','${rname[i]}','${rcontact[i]}','${relation[i]}')`,
          (err, result) => {
            if (err) throw err;
            console.log("references inserted");
          }
        );
      }

      //preferences
      const plocation = data.location;
      const noticeperiod = data.notice;
      const ectc = data.expected_ctc;
      const pdepartment = data.department;
      db.query(
        `insert into preference(applicant_id,location,notice,expected_ctc,department) values
      ('${applicantId}','${plocation}','${noticeperiod}','${ectc}','${pdepartment}')`,
        (err, result) => {
          if (err) throw err;
          console.log("preferences inserted sucusessfully!");
        }
      );

      res.send("done");
    });
  });




var limit = 10;
app.get('/views', (req, res) => {
  var ajax = req.query.ajax || false;
  let k = (req.query.id - 1) * limit || 0;
  var sql12 = `select * from basic_info where is_deleted=0`;
  db.query(sql12, (err, result2) => {

    data12 = result2;
    var sql13 = `select * from basic_info where is_deleted!=1 limit ${k},${limit}`;
    db.query(sql13, (err, result) => {
      if (err) throw err;

      if (!ajax) {
        res.render("views", { record: result, count_record: data12.length, limit });
      }
      else {
        res.json(result);
      }
    });
  });
});




// app.get("/views", (req, res) => {
//   const PAGE_SIZE = 10;
//   const page = parseInt(req.query.page) || 1;
//   let offset = (page - 1) * PAGE_SIZE;
//   db.query(`SELECT * FROM basic_info WHERE is_deleted = 0 limit ${offset},${PAGE_SIZE} `, (err, result) => {
//     if (err) throw err;
//     db.query(`SELECT COUNT(*) as count FROM basic_info WHERE is_deleted = 0`,(err,count)=>{
//       if(err) throw err;
//       const totcount = count[0].count;
//       const pageCount = Math.ceil(totcount / PAGE_SIZE);

//     res.render("views", {
//       record: result,
//       count:totcount,
//       totpages:pageCount,
//       page:page

//     });
//   });
// });
// });
app.get("/search", function (req, res) {
  const column = req.query.column;
  const term = req.query.term;
  const sql = `SELECT * FROM basic_info WHERE ${column} LIKE '%${term}%'`;

  db.query(sql, function (err, results) {
    if (err) throw err;

    db.query(`SELECT COUNT(*) as count FROM basic_info WHERE is_deleted = 0`, (err, count) => {
      if (err) throw err;
      const totcount = count[0].count;


      res.render("views", { record: results, count_record: totcount, term: term, limit });
    });
  });
});

//delete function
// app.post('/deleteSelected', function(req, res) {
//     var selectedRows = req.body.selectedRows;
//     if (!selectedRows || !selectedRows.length) {
//       res.redirect('/views');
//       return;
//     }

//     var placeholders = selectedRows.map(function() { return '?' }).join(',');
//     var sql = 'UPDATE basic_info SET is_deleted = 1 WHERE id IN (' + placeholders + ')';
//     db.query(sql, selectedRows, function(error, results) {
//       if (error) throw error;
//       res.redirect('/views');
//     });

//   });
app.get('/deleteData', (req, res) => {
  var cd_id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id in (${cd_id})`, (err, result) => {
    if (err) throw err;

  });
})

app.post('/deleteOne', (req, res) => {
  var id = req.query.id;
  db.query(`update basic_info set is_deleted = 1 where id = ${id}`, (err, result) => {
    if (err) throw err;

  });
  res.json({ ans: "deleted successfully!" })
});

app.get('/retrive', (req, res) => {
  db.query("update basic_info set is_deleted = 0", (err, result) => {
    if (err) throw err;
    res.send('retrive succesfull');
  })
})


// app.get('/edit', (req, res) => {
//   const id = req.query.id;
//   const sql = `SELECT * FROM basic_info WHERE id = ${id} AND is_deleted = 0`;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.render('edit', { basicInfo: results[0] });
//   });
// });



// db.query('SELECT * FROM city_master', (error, cities) => {
//   if (error) throw error;
//   console.log('Cities data:', cities);
// });


// db.query('SELECT * FROM state_master', (error, states) => {
//   if (error) throw error;
//   console.log('States data:', states);
// });

// Set up the route for the job application form
app.get("/edit", async (req, res) => {
  var id = req.query.id;
  


          db.query("SELECT * FROM state_master", (err, states) => {
            if (err) {
              throw err;
            }

            db.query(
              "SELECT option_name FROM option_master where select_id = 2",
              (err, rel) => {
                if (err) {
                  throw err;
                }
                db.query(
                  "SELECT option_name FROM option_master where select_id = 3",
                  (err, location) => {
                    if (err) {
                      throw err;
                    }

                    db.query(
                      "SELECT option_name FROM option_master where select_id = 4",
                      (err, department) => {
                        if (err) {
                          throw err;
                        }
                        db.query(
                          "SELECT option_name FROM option_master where select_id = 5",
                          (err, courses) => {
                            if (err) {
                              throw err;
                            }
                            db.query(
                              "SELECT option_name FROM option_master where select_id = 6",
                              (err, languages) => {
                                if (err) {
                                  throw err;
                                }
                                db.query(
                                  "SELECT option_name FROM option_master where select_id = 7",
                                  (err, technologies) => {
                                    if (err) {
                                      throw err;
                                    }


                                    //

                                    db.query(`select * from basic_info where is_deleted=0 AND id = ${id}`, (err, basic_info) => {
                                      if (err) throw err;
                                      console.log(basic_info);
                                      var stateId = basic_info[0].state;
                                  
                                      db.query(`select * from state_master where id = ${stateId}`, (err, stateid) => {
                                        if (err) throw err;
                                        console.log("st"+stateid);
                                  
                                  
                                        db.query(`select * from acadamics where applicant_id = ${id}`, (err, edu) => {
                                          if (err) throw err;
                                          console.log(edu);
                                  
                                          db.query(`select * from work_experience where applicant_id = ${id}`, (err, work) => {
                                            if (err) throw err;
                                            console.log(work);

                                            db.query(`select * from LanguagesKnown where applicant_id = ${id}`,(err,lang)=>{
                                              if(err) throw err;
                                              var lanjson = JSON.stringify(lang);
                                              console.log(lang)
                                              console.log("lang"+lanjson);

                                              db.query(`select * from skills where applicant_id = ${id}`,(err,skill)=>{
                                                if(err) throw err;
                                                console.log(lang);

                                                db.query(`select * from reference where applicant_id = ${id}`,(err,ref)=>{
                                                  if(err) throw err;

                                                  db.query(`select * from preference where applicant_id = ${id}`,(err,pref)=>{
                                                    if(err) throw err;
                                                    console.log(pref);
                                                
                                               
                                  

                                    // Render the job application form and pass the data for the select boxes to the template
                                   res.render("edit", {
                                      states: states,
                                      relation: rel,
                                      location: location,
                                      dep: department,
                                      course: courses,
                                      language: languages,
                                      tec: technologies,
                                      basic_info,
                                      edu,
                                      stateid,
                                      work,
                                      lanjson,
                                      lang,
                                      skill,
                                      ref,
                                      pref
                                    })
                                    });
                                  })
                                            
                                  })
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          });
        });
      })
    })
  })
})
})

//edit save data
app.post("/update", (req, res) => {
  const data = req.body;
  const course = req.body.course;
  const board = req.body.board;
  const passingyear = req.body.passingYear;
  const pr = req.body.percentage;
  console.log(course);
  console.log(board);
  console.log(passingyear);
  console.log(pr);
  const state = req.body.state;
  const city = req.body.city;
  const id = data.id;
  console.log("ID = " + id);
 
  console.log(city);
  const basicSql = `update basic_info set first_name =  "${data.first_name}", last_name = "${data.last_name}",
    gender = "${data.gender}",dob = "${data.dob}",job_designation = "${data.job_designation}",address1="${data.address1}",
    email = "${data.email}",phone="${data.phone}",city="${data.city}",state=${state},zip="${data.zip}",
    relation_status = "${data.relation_status}" where id = ${id}
    `;

  db.query(basicSql, (err, result) => {
    if (err) {
      throw err;
    }
  });

      db.query(`delete from acadamics where applicant_id=${id}`,(err,result)=>{
        if(err) throw err;
        console.log("edu deleted");
      });
      applicantId = id;

      if (typeof (course, board, passingyear, pr) == "string") {
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

        db.query(eduSql, (err, result) => {
          if (err) throw err;
          console.log("edu inserted");
        });
      } else {
        for (i = 0; i < course.length; i++) {
          eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

          db.query(eduSql, (err, result) => {
            if (err) throw err;
            console.log("edu inserted");
          });
        }
      }
      
    // if (typeof (course, board, passingyear, pr) == "string") {
    //   eduSql = `update acadamics set course='${course}',board='${board}',passingYear='${passingyear}',percentage='${pr}' where applicant_id=${id}`;

    //   db.query(eduSql, (err, result) => {
    //     if (err) throw err;
    //     console.log("edu updated");
    //   });
    // } else {
    //   for (i = 0; i < course.length; i++) {
    //     eduSql = `update acadamics set course='${course[i]}',board='${board[i]}',passingYear='${passingyear[i]}',percentage='${pr[i]}' where applicant_id=${id}`;

    //     db.query(eduSql, (err, result) => {
    //       if (err) throw err;
    //       console.log("edu updated");
    //     });
    //   }
    // }
     db.query(`delete from work_experience where applicant_id = ${id}`,(err,result)=>{
      if(err) throw err;
      console.log("work experience deleted!");
     })
    const c_name = req.body.company_name;
    const desig = req.body.jobtitle;
    const start = req.body.start_date;
    const end = req.body.end_date;
    console.log(c_name);
    console.log(desig);
    console.log(start);
    console.log(end);
    if (typeof (c_name, desig, start, end) == "string") {
      expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
    ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

      db.query(expSql, (err, result) => {
        if (err) throw err;
        console.log("exp inserted");
      });
    } else {
      for (i = 0; i < c_name.length; i++) {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
    ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log("exp inserted");
        });
      }
    }

    
    
    ////languages
    db.query(`delete from LanguagesKnown where applicant_id=${id}`,(err,result)=>{
      if(err) throw err;
    });
    var applicantId = id;
    var lang = req.body.Language;
    var r = req.body[lang + "read"] ? "yes" : "no";
    var w = req.body[lang + "write"] ? "yes" : "no";
    var s = req.body[lang + "speak"] ? "yes" : "no";
    console.log(lang);
    console.log(r);
    if (typeof lang == "string") {
      var query_lan =
        "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)";
      db.query(query_lan, [applicantId, lang, r, w, s], (err, ans) => {
        if (err) return console.log(err.message);
        console.log("languages inserted");
      });
    } else {
      lang.forEach((language) => {
        const read2 = req.body[language + "read"] ? "yes" : "no";
        const write2 = req.body[language + "write"] ? "yes" : "no";
        const speak2 = req.body[language + "speak"] ? "yes" : "no";

        db.query(
          "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)",
          [applicantId, language, read2, write2, speak2],
          (err, result) => {
            if (err) {
              throw err;
            }

            console.log("language inserted");
          }
        );
      });
    }

    //getting technology
  db.query(`delete from skills where applicant_id = ${id}`,(err,result)=>{
    if(err) throw err;
  });
    const skills = req.body.technology;
    const lavel = req.body[skills + "a"];
    console.log("skills " + skills);
    if (typeof skills == "string") {
      db.query(
        "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
        [applicantId, skills, lavel],
        (err, result) => {
          if (err) throw err;
          console.log("skills one inserted");
        }
      );
    } else {
      skills.forEach((tec) => {
        const lavel = req.body[tec + "a"];
        console.log("lavel " + lavel);
        db.query(
          "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
          [applicantId, tec, lavel],
          (err, result) => {
            if (err) throw err;
            console.log("skills inserted");
          }
        );
      });
    }

    db.query(`delete from reference where applicant_id = ${id}`,(err,result)=>{
      if(err) throw err;
      console.log("references deleted")
    });
    //getting references
    const rname = data.rname;
    const rcontact = data.rcontact;
    const relation = data.relation;
    for (let i = 0; i < rname.length; i++) {
      db.query(
        `insert into reference(applicant_id,rname,rcontact,relation) 
    values('${applicantId}','${rname[i]}','${rcontact[i]}','${relation[i]}')`,
        (err, result) => {
          if (err) throw err;
          console.log("ferences inserted");
        }
      );
    }

    //preferences
    const plocation = data.location;
    const noticeperiod = data.notice;
    const ectc = data.expected_ctc;
    const pdepartment = data.department;
    db.query(
      `update preference set location='${plocation}',notice='${noticeperiod}',expected_ctc='${ectc}',department='${pdepartment}' where applicant_id=${id}`,
      (err, result) => {
        if (err) throw err;
        console.log("preferences updated sucusessfully!");
      }
    );

    res.send("done");
  });


