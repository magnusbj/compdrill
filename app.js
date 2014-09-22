// attempt to write my own app
// use html files in the /views folder
// css script and html files from bootstrap
// run with express at a minum, with ejs as view engine

var express = require('express');
var fs = require('fs');
var json = require('express-json');
var app = express();
var loadPosts = express.Router();

//app.set('views', __dirname + '/views/')
app.set('views', __dirname + '/jumbo/')
app.use(express.static(__dirname + '/jumbo/'));

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);


app.locals.title= 'Progressive Drilling and Well solutions';
app.use(json());

app.use('/', loadPosts);

// function skrivNoeTull(tull) {}
// var skrivNoeTull = function(tull) {console.log(tull);}
// skivNoeTull("tull");

loadPosts.use(function(req, res, next){
    fs.readFile('./texts/slogan.txt', function (err, slogandata){
	var slogan = slogandata;
	res.slogan = slogan;
	console.log("slogan loaded to req.slogan");
	});
    fs.readFile('./texts/stories.json', function(err, data){
	var posts = data;
	var parsed = JSON.parse(posts);
	var title =[];
	var slug = [];
	var content = [];
	var i = 0;
	parsed.forEach(function(post) {
	    title[i] = post.title;
	    slug[i] = post.slug;
	    content[i] = post.content;
	    i++;
	});
	console.log("Posts loaded into title, slug and content");
	res.render('index.ejs', {headline: "Newface", content1: "example. need to load file", postlength: title.length, posttitle: title, postslug: slug, postcontent: content, slogan: res.slogan});

    next();
  });
});

app.get('/empty', function(request, response){
    fs.readFile('./texts/slogan.txt', function (err, data){
    response.render('empty.ejs', { headline: 'Composite Drilling'});
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
