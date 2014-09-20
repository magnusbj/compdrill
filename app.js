// attempt to write my own app
// use html files in the /views folder
// css script and html files from bootstrap
// run with express at a minum, with ejs as view engine

var express = require('express');
var fs = require('fs');
var json = require('express-json');
var app = express();
//var bodyParser = require('body-parser');
//app.set('views', __dirname + '/views/')
app.set('views', __dirname + '/jumbo/')
//app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);


app.locals.title= 'Welcommings';
app.use(json());

// function skrivNoeTull(tull) {}
// var skrivNoeTull = function(tull) {console.log(tull);}
// skivNoeTull("tull");

app.all('/post/jsondemo', function(req, res, next){
 fs.readFile('posts.json', function(err, data){

//    fs.readFile('./texts/stories.json', function(err, data){
	var posts = data;
	console.log("raw data: " + posts);
	console.log("JSON data: " + JSON.parse(posts));
	var parsed = JSON.parse(posts);
        parsed.forEach(function(post){
        // for (var post in parsed) {
	    console.log("slug : " + post + " " + post.slug);
        });
        console.log("length: " + parsed.length);
         console.log("raw foreach: " + parsed[0].slug);
	    console.log("JSON foreach: " + json(JSON.parse(posts)).slug);
        res.send(posts);
//})
;

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
//    res.locals.posts.forEach(function(post){
//      if (req.params.slug === post.slug){
//          console.log("Success, matched slug with input");
//          res.render('index.html', {post: post});
//          }
//	else{
//	    console.log("No match with: " + req.params.slug);
//	}
        next();
//      })
});

//app.get('/', function(request, response){
//    fs.readFile('./texts/slogan.txt', function (err, data){
//    response.render('index.ejs', { headline: 'Composite Drilling', content1: data});
//    });
//});


// start the app
app.listen(app.get('port'));
//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Listening on " + app.get('port'));
//});
