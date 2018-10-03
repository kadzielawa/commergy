/**
 * Created by kuba on 21.08.17.
 */

var mongoose = require('mongoose');
var passport = require('passport');
var activities = require('../models/activity_model');

var Stats = function(req, res) {
    this.request = req;
    this.response = res;

};

Stats.prototype.getData = function(req, res) {
    var comm_uid  = 'a384b6463fc216a5f8ecb6670f86456a';
    var arr = ['dsadas'];
    activities.find({}).lean().exec().then(function () {

        return arr;

    })

};

module.exports = new Stats();
