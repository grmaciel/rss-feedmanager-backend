var FeedParser = require('feedparser')
var request = require('request')

function feed(req, res, next) {
  var answered = false
  var req = request('https://jovemnerd.com.br/feed-nerdcast')
  req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
  req.setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser();
  // Define our handlers
  req.on('error', done);
  req.on('response', function(res) {
  	console.log('request response code: ' + res.statusCode)
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    res.pipe(feedparser);
  });

  feedparser.on('error', done);
  feedparser.on('end', done);
  feedparser.on('readable', function() {
  	// not needed in the feature, just making sure we are not sending empty data after having send it
  	if (!answered) {
  		res.send(this.read());
  		answered = true
  	}
  });
};

function done(err) {
  if (err) {
    console.log(err, err.stack);
    return process.exit(1);
  }
  console.log('parser finished')
}

module.exports = {
	feed: feed
};