// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var api = require('./routes/api');
require('babel-register')({
    presets: [ 'env' ]
})

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
Utils = require('./modules/utils');
/**
 * Get port from environment and store in Express.
 */

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,

}
app.use(cors(corsOptions));
app.set('port', 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //ta funkcja jest odpowiedzialna za sprawdzenie obecnej ścieżki w menu i zaznaczenie itemu jako aktywny
    res.locals.getMenuIsActive = function(name) {
        var requestPath = req.route.path;
        var isMatch = false;
        switch (name) {
            case 'home':
                if (requestPath.match("\/$"))
                    return 'class=active';
                break;
            case 'match':
                if (requestPath.match("\/match\/"))
                    return 'class=active';
                break;
        }
    }
    next();
});

//stworzenie socketa
    clients = [];
    io.on('connection', function (socket) {
        console.info('New client connected (id=' + socket.id + ').');
        var comm_uid = socket.handshake.query.comm_uid;
        console.log('tworzy z comm_iod: ' + comm_uid);
        console.log(socket.handshake.query);
        clients[comm_uid] = socket;

      //  socket.emit('socketToMe', {comm_uid: comm_uid, my: "data"});

        // When socket disconnects, remove it from the list:
        socket.on('disconnect', function () {
            var index = clients.indexOf(socket);
            if (index != -1) {
                clients.splice(index, 1);
                console.info('Client gone (id=' + socket.id + ').');
            }
        });
    });


app.use(function(req, res, next) {
    res.io = io;
    res.clients = clients;
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
//app.use('/admin', Utils.ifIsAdmin, admin);
app.use('/api', api); 

// passport config
var User = require('./models/user_model');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/commergy');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;

    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.message);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = {app: app, server: server};
