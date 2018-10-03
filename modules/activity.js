var mongoose = require('mongoose');
var ActivityModel = require('../models/activity_model.js');

var Activity = function(req, res) {
    this.request = req;
    this.response = res;

};

Activity.prototype.getActivities = function() {

    var query = TeamModel.find({});
    return query;
}

Activity.prototype.addActivity = function(req, res, next) {
    if (req.body.app_id && req.body.event_name) {
        var activity = new ActivityModel({ event_name: req.body.event_name, text: req.body.text, app_id: req.body.app_id });
        activity.save(function(err) {
            if (err) return console.error(err);
        });
    }

    //   res.render('new-team');
}

module.exports = new Activity();
