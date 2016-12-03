var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.post('/signup', function(req, res, next) {
	User.create(req.body, function(err, post){
		if (err) {
            console.log("Error = " + err);
            return next(err)
        };
		res.setHeader("Content-Type", "text/json");
		res.send(JSON.stringify({result: "success"}));
	});
	console.log("data = " + JSON.stringify(req.body));
    console.log("data = " + JSON.stringify(req.body.email));
});

router.post('/login', function(req, res, next) {
	User.count({'username' : req.body.username, 'password' : req.body.password}, function (err, count) {
        if (err) return next(err);
        console.log("count = " + count);
        res.setHeader("Content-Type", "text/json");
        if (count == 1) {
            var sess = req.session;
            sess.username = req.body.username; //save username in the session variable
        	res.send(JSON.stringify({result: "success"}));
        } else {
            res.send(JSON.stringify({result: "error"}));
        }
    });
});

module.exports = router;
