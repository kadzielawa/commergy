var mongoose = require('mongoose');
var passport = require('passport');
var md5 = require('md5');
var code = require('./code');
var User = function(req, res) {
    this.request = req;
    this.response = res;

};

User.prototype.login = function(req, res) {
    console.log(req);
    //res.render("login");
}
User.prototype.myAccount = function(req, res) {

   
    if (typeof req.user !== 'undefined') {
        var coded = code.getCode(req);
        res.render("account", { req: req, userCode: coded });
    } else {
        res.redirect('/login');
    }
}
User.prototype.register = function(req,response) {
    //handle register user 
///    var message = '';
    if (!Utils.isEmptyObject(req.body)) {
        if (req.body.username && req.body.password && req.body.email) {
            var create = createUser(req, response);
      //      message = "Utworzono pomyślnie użytkownika!";

        } else {
        //    message =  "Użytkownik nie został utworzony!";
        }
        return false;
    }

}


function createUser(req, res) {
    var User = require('../models/user_model.js');
    User.register(new User({ username: req.body.username, email: req.body.email, comm_uid: md5(req.body.email)  }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account: account });
            return false;

        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/account');
        });
    });
}

module.exports = new User();
