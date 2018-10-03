var mongoose = require('mongoose');
var passport = require('passport');
var activity = require('./activity');
// sio = require('../app').sio;
//
// sio.sockets.on('connection', function(sock){
//     socket.stuff(sock, sio);
// });
var Api = function(req, res) {
    this.request = req;
    this.response = res;

};

Api.prototype.fetchData = function(req, res) {
    activity.addActivity(req,res);
};

module.exports = new Api();
