'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./app/config');
const routes = require('./app/routes');

const port = config.get('port');

app.use(morgan('dev'));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes(app);
app.listen(port);