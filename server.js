/**
 * Created by ChikeUdenze on 4/18/17.
 */
var express = require('express'),
    app = express();
var logger = require('morgan');
var multer = require('multer');
var config = require('./config');
var mongoose = require('mongoose');
var apiRouter = require('./APIs/api')();

// connect to our DATABASE (hosted locally)
mongoose.connect(config.DATABASE);

//uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,x-access-token');
    res.setHeader('X-Powered-By', 'blah');
    next();
});

app.use(multer());

app.use(logger('dev'));

app.use('/api', apiRouter);



app.get("/", function(req, res){
    res.send("Hello World");
});

app.use("*", function(req, res){
   res.send("invalid URL");
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
        console.log('Error: ' + err.stack);
    });
}

var server = app.listen(config.PORT);

server.timeout = 3600000;
console.log(app.get('env'));
console.log('Running on PORT' + config.PORT);