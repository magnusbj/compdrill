// init module usage
var express = require('express')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , db = require('./models');

// init db and app
var app = express()


// init views
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.set('port',process.env.PORT || 8080);


app.configure('development', function(){
 app.use(express.errorHandler())
 app.locals.pretty = true
})

// init static public directory
app.use(express.static(__dirname + '/public'))

// render pages
app.get('/', function(req, res){
  var data = fs.readFileSync('index.html').toString();
  response.send(data);
// res.render('index', {title: 'hello world'}) 
});

// listen on port
db.sequelize.sync().complete(function(err) {
  if (err) {
      throw err;
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log("Listening on " + app.get('port'));
    });
  }
});
// app.listen(8080)
