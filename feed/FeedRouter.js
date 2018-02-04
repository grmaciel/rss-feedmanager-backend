var express = require('express');
var router = express.Router();
var controller = require('./FeedController')

router.get('/', controller.feed)

module.exports = router;