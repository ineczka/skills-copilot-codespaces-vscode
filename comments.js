// Create web server
// 1. npm install express --save
// 2. npm install body-parser --save
// 3. npm install cookie-parser --save
// 4. npm install multer --save

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/comments.html', function (req, res) {
   res.sendFile( __dirname + "/" + "comments.html" );
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
      name:req.query.name,
      comment:req.query.comment
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
      name:req.body.name,
      comment:req.body.comment
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   fs.readFile('comments.json', 'utf8', function (err, data) {
      if (err) throw err;
      var comments = JSON.parse(data);
      console.log(comments);
   });

   console.log("Example app listening at http://%s:%s", host, port)
}) 
