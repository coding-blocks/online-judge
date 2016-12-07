var path = require('path');
var express = require('express');
var router = express.Router();

var User = require('../models/User.js');
var Question = require('../models/Question.js');
var Submission = require('../models/Submission.js');
var Scorer = require('../util/calc-score.js');

router.post('/signup', function(req, res, next) {
    res.setHeader("Content-Type", "text/json");
    User.count({'username' : req.body.username}, function(err, count) {
        if (err) return next(err);
        if (count > 0) {
            res.send(JSON.stringify({result: "error", error: "Username already taken."}));
            return;
        }
        User.create(req.body, function(err, post){
            if (err) {
                console.log("Error = " + err);
                return next(err);
            };
            res.setHeader("Content-Type", "text/json");
            res.send(JSON.stringify({result: "success"}));
        });
    });
	

	console.log("data = " + JSON.stringify(req.body));
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

router.get('/questions', function(req, res, next) {
    Question.find({assignment_id: 1}, function(err, docs) {
        res.setHeader("Content-Type", "text/json");
        res.send(JSON.stringify({result: "success", data: docs}));
    });
});

router.get('/question/:id', function(req, res, next) {
    Question.findOne({assignment_id: 1, _id: req.params.id}, function(err, doc) {
        if (err) {
            console.log("error = " + err);
            next(err);
        }
        res.setHeader("Content-Type", "text/json");
        res.send(JSON.stringify({result: "success", data: doc}));
    });
});

router.post('/submission/:id/upload/:user', function(req, res, next) {
    res.setHeader("Content-Type", "text/json");
    if (!req.files) {
        res.send(JSON.stringify({result:"error"}));
        console.log("no file uploaded");
        return;
    }
    var sub = new Submission({
        user: req.params.user,
        question_id: req.params.id,
    });
    sub.save(function(err) {
        var submission = req.files.userOutput;
        submission.mv("./public/submissions/" + sub._id, function(err) {
            if (err) {
                console.log("error while moving the file = " + err);
                res.send(JSON.stringify({result:"error"}));
            } else {
                res.send(JSON.stringify({result: "success"}));
                sub.score = Scorer.get_score(req.params.id, sub._id);
                console.log("score = " + score);
                sub.save();
            }
        });
    });
    
});

router.get('/leaderboard/:id', function(req, res, next) {
    res.setHeader("Content-Type", "text/json");
    Submission.find({
        question_id: req.params.id,
    })
    .sort({score: -1})
    .exec(function(err, docs) {
        res.send(JSON.stringify({result: "success", data: docs}));
    });
});

router.get('/files/:file/:name', function(req, res, next) {
    var file = "./public/data/" + req.params.file
    console.log("filename = " + file);
    res.setHeader("Content-Type", "application/x-download-please");
    res.download(file, req.params.name);
});

module.exports = router;
