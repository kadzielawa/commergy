var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MongoMapper = require('../modules/mongo-mapper');
var Activity = new Schema({
    app_id: String,
    event_name: String,
    text: String
});

var sequence = MongoMapper.sequenceGenerator('activity');


Activity.pre('save', function(next) {
    var doc = this;
    // get the next sequence
    sequence.next(function(nextSeq) {
        doc.id = nextSeq;
        next();
    });
});

module.exports = mongoose.model('activities', Activity);
