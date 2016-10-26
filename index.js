// include modules
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4500));

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));

// setup server
var server = require('http').createServer(app);
server.listen((process.env.PORT || app.get('port')), function() {
  console.log("Express server listening on port %d ", server.address().port);
});

// home page
app.get('/', function(req, res) {
    res.render('index');
});

// registration page
app.get('/loginRegister', function(req,res) {
  res.render('loginRegister')
});
