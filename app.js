// attempt to write my own app
// use html files in the /views folder
// css script and html files from bootstrap
// run with express at a minum, with ejs as view engine

var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express();
app.set('views', __dirname + '/jumbo/')
//app.set('views', __dirname + '/node_modules/bootstrap/docs/examples/jumbotron/')
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

console.log(app.get('views'));

app.get('/', function(request, response){
//  http.render('index.html');
  response.send(fs.readFileSync(app.get('views') +"index.html").toString());
//  response.send(fs.readFileSync("index.html").toString());
  
//    response.setHeader("Content-type", "text/html");
  //  response.end(text);
//    });
  });

// start the app
http.createServer(app).listen(app.get('port'), function(){
  console.log("Listening on " + app.get('port'));
});
