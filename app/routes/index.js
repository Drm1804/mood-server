'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const UserModel  = require('../mongoose').UserModel;

module.exports = function(app){
    app.use(express.static('app/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());



    app.get('/api/users', function(req, res) {
        UserModel.find(function(err, users) {
            res.json(users);
        });
    });


    //
    // Auth
    //

    app.post('/api/user', function(req, res, next){
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


};