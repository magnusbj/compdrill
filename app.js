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
//      console.log(res.locals.posts);
    next();
  });
});

app.get('/', function(request, response){
    fs.readFile('./texts/slogan.txt', function (err, data){
    response.render('index.ejs', { headline: 'Composite Drilling', content1: data});
    });
});

app.get('/post/:slug', function(req,res, next){
    console.log("Slug recorded: " + req.params.slug);
    res.locals.posts.forEach(function(post){
      if (req.params.slug === post.slug){
	  console.log("Success, matched slug with input");
	  res.render('index.html', {post: post});
	  }
	next();
      })
});

// start the app
app.listen(app.get('port'));
//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Listening on " + app.get('port'));
//});
