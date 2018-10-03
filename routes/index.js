var express = require('express');
var router = express.Router();
var user = require('../modules/user');
var passport = require('passport');
var stats = require('../modules/stats');

/* GET home page. */
router.get("/", function(req, res) {
    res.render("index");
});

router.get('/account', user.myAccount);


router.get('/demo', function(req,res){
    res.render('demo');

});

router.get('/stats', function(req,res){
    res.render('stats', {overall_stats: stats});

});

router.get('/dashboard', function(req,res){
    res.render('dashboard',{comm_uid: req.user.comm_uid});

});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/verify', function(req, res) {
    res.render('verify');
});

router.post('/register',function(req, res) {
    user.register(req,res);

});

router.get('/login', function(req, res) {

    res.render('login', user.login({ user: req.user }));
});
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/account');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
