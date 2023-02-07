var fs = require('fs');
var http = require('http');

//read a file
// fs.readFile('input.txt','utf-8',function(err,data){
//     if(err) throw err;
//     console.log(data);
// });


// http.createServer(function(req,res){
//     fs.readFile('input.txt','utf8',function(err,data){
//         if(err) throw err;
//         res.writeHead(200,{'content-type':'text/html'});
//         res.write(data);
//         res.end();
//     })
// }).listen(8080);

//create files  and update 
// fs.appendFile('test.txt','test text script',function(err,data){
//     if(err) throw err;
//     console.log('created');
// });

// fs.open('test2.txt','w',function(err,data){
//     if(err) throw err;
//     console.log('file created');
// })

//Delete Files
// fs.unlink('test.txt',(err) => {
//     if(err) throw err;
//     console.log('deleted');
// })

//Rename Files
// fs.rename('input.txt','new.txt',(err) => {
//     if(err) throw err;
//     console.log('renamed');
// })