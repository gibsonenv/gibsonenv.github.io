var express = require('express');
var exphbs  = require('express-handlebars');
var helpers = require('handlebars-helpers')();
var path = require('path');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 5000))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//app.use(express.static(__dirname + '../public/'))
app.use('/static', express.static(path.join(__dirname, '/public')));
//app.use(express.static('public'))
app.use('/',router)
app.enable('view cache');


router.get('/',function(req, res){
	res.render('index', {
		title : "Home"
	})
});

router.get('/challenge',function(req, res){
    res.render('challenge', {
		title: "Challenge"
	});
});

router.get('/platform',function(req, res){
	res.render('platform', {
		title : "Platform"
	});
});

router.get('/paper',function(req, res){
  res.render('paper', {
		title : "Paper"
	});
});


app.listen(app.get('port'), function() {
  console.log("Cambria app is running at localhost:" + app.get('port'))
})
