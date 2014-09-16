// init module usage
var express = require('express')

// init db and app
var app = express()


// init views
app.set('views', __dirname + '/views')


app.configure('development', function(){
 app.use(express.errorHandler())
 app.locals.pretty = true
})

// init static public directory
app.use(express.static(__dirname + '/public'))

// render pages
 app.get('/', function(req, res){
 res.render('index', {title: 'hello world'})
})

// listen on port
app.listen(8080)
