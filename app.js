var express = require('express');
// var config = require('./config.json')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 9080;

var app = express();

app.set('view engine', 'html');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    next();
})

app.use(express.static(__dirname + '/static/'));


app.get('/index',function(req,res){
    res.sendfile(__dirname + '/static/views/index.html');
})

app.listen(port, function() {
    console.log('node 服务已开启,监听端口号：' + port)
});
