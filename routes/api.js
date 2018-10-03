var express = require('express');
var router = express.Router();
var api = require('../modules/api');



router.get('/main', function(req, res, next) {
    api.fetchData(req);
});



router.post('/main', function(req, res, next) {

    var comm_uid = req.body.app_id;


    api.fetchData(req);
    console.log('comm_uid:'+ comm_uid);
    if(comm_uid && res.clients.isInArray(comm_uid)) {
        res.clients[comm_uid].emit("socketToMe", req.body);
    }
    res.sendStatus(200);

});

module.exports = router;
