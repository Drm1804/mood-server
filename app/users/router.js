'use strict';

const app = require('express').Router();
const UserModel = require('./mongoose').UserModel;
var bodyParser = require('body-parser');

// const jsonParser = bodyParser.json();

app.get('/users', function(req, res) {
    UserModel.find(function(err, users) {
        res.json(users);
    });
});

app.post('/user', function(req, res, next){
    console.log(res.body);
    const user = new UserModel({ username: req.body.email, password: req.body.password});
    user.save(function(err){
        if(!err){
            next(err);
            return res.send({status: 'OK'});
        } else {
            res.statusCode = 500;
            res.send({error: 'Server error'});
            console.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });

});

module.exports = app;