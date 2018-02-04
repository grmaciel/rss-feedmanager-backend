var express = require('express')

var feed = require('./feed/FeedRouter')
var mainRouter = require('./router/Router')
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

var app = express();

// Routes mapping
app.use('/', mainRouter);
app.use('/feed', feed);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log('Error: ' + err);
    next(err);
});

module.exports = app;

app.listen(process.env.PORT || 8000, function () {
	console.log('Listening on port...')
})