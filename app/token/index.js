'use strict';
const crypto = require('crypto');
const config = require('../config');
const TokenModel = require('./mongoose').AccessTokenModel;
const uid = require('rand-token').uid;


const secretKey = config.get('session').secret;


const checkToken = function (req, res, next) {
    const query = TokenModel.find({token: req.headers.authorization});
    const promise = query.exec();

    return promise.then(function(resp){
        if(resp.length > 0){
            next();
        } else {
            res.send(401, 'Unauthorized')
        }
    }, function(){
        res.send(401, 'Unauthorized')
    });

};

const createToken = function (req, res, user) {

    let token = new TokenModel({
        userId: user.username,
        token: uid(16),
        claims: []
    });


    return token.save();
};

const removeToken = function (req, res) {
    return TokenModel.remove({"token": req.headers.authorization})
};

module.exports = {
    checkToken: checkToken,
    removeToken: removeToken,
    createToken: createToken
};