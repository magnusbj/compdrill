// attempt to write my own app
// use html files in the /views folder
// css script and html files from bootstrap
// run with express at a minum, with ejs as view engine

var express = require('express');
var fs = require('fs');

var app = express();
//app.set('views', __dirname + '/views/')
app.set('views', __dirname + '/jumbo/')

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

app.locals.title= 'Welcommings';

app.all('*', function(req, res, next){
  fs.readFile('posts.json', function(err, data){
    res.locals.posts = JSON.parse(data);
      console.log(res.locals.posts.slug);
    next();
  });
});

app.get('/', function(request, response){
  response.send(fs.readFileSync(app.get('views') +"index.html").toString());
  });

app.get('/:slug', function(req,res, next){
  res.locals.posts.forEach(function(post){
      if (req.post.slug === post.slug){
	  res.render('index.ejs', {post: post});
	  }
      })
});

// start the app
app.listen(8080);
//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Listening on " + app.get('port'));
//});
