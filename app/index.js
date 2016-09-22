const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const port = config.get('port');
const bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(function(req, res, next){
    app.use(express.static('app/public'));
    next();

});

app.use('/api', require('./users/router'));


app.listen(port);

module.exports = app;