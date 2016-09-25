'use strict';

const app = require('express').Router();
const UserModel = require('./mongoose').UserModel;
const token = require('../token');
const pass = require('../lib/password');
const crypto = require('crypto');
const config = require('../config');
const secretKey = config.get('session').secret;


app.get('/users', token.checkToken, function (req, res, next) {
    UserModel.find(function (err, users) {
        res.json(users);
    });
});

app.post('/user', function (req, res, next) {

    const hashPass = crypto.createHmac('sha256', secretKey)
        .update(req.body.password)
        .digest('hex');

    const user = new UserModel({username: req.body.email, password: hashPass});
    user.save(function (err) {
        if (!err) {
            next(err);
            return res.send({status: 'OK'});
        } else {
            res.statusCode = 500;
            res.send({error: 'Server error'});
            console.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });

});

//
//  Auth
//


app.post('/login', function (req, res) {

    const userData = {
        username: req.body.username,
        pass: req.body.password
    };

    return UserModel.findOne({username: userData.username})
        .then(function (user) {
            let checkPass = pass.checkPass(userData, user);
            if (checkPass) {
                token.createToken(req, res, user)
                    .then(function (resp) {
                        res.send('200', {'token': resp});
                    }, function(){
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                        console.error('Internal error(%d): %s', res.statusCode, resp.message);
                    });
            } else {
                res.send(401, 'Введенные данные неверны');
            }
        }, function (err) {
            res.statusCode = 500;
            res.send({error: 'Server error'});
            console.error('Internal error(%d): %s', res.statusCode, err.message);
        })

});

app.post('/logout', token.checkToken, function (req, res) {

    token.removeToken(req, res)
        .then(function () {
            res.send(200, {status: 'OK'})
        }, function(){
            res.statusCode = 500;
            res.send({error: 'Server error'});
            console.error('Internal error(%d): %s', res.statusCode, resp.message);
        })

});

module.exports = app;