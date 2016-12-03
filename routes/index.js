var express = require('express');
var router = express.Router();

var Question = require('../models/Question.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var sess = req.session;
    //display different views according to the session variable
	if (sess.username) {
        console.log("session variable set in /");
        Question.find(function (err, rows) {
            console.log("derp = " + JSON.stringify(rows));
        });
        res.render('terminal', { username: sess.username });
    } else {
        res.render('index', { title: 'CodingBlocks Online Judge' });
    }
});

router.get('/login', function(req, res, next) {
	var sess = req.session;
	if (sess.username) {
        console.log("session variable set in /login");
		//user has already logged in. Redirect.
		res.redirect('/');
	} else {
		res.render('login', {title: 'Login'});
	}
});

module.exports = router;
