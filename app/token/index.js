'use strict';
const crypto = require('crypto');
const config = require('../config');
const TokenModel = require('./mongoose').AccessTokenModel;
var uid = require('rand-token').uid;


const secretKey = config.get('session').secret;



const checkToken = function (req, res, next) {
    if (req.headers.authorization) {
        console.log(req.headers.authorization);
        next();
    } else {
        res.send(401, 'Unauthorized')
    }

};

const createToken = function (req, res, user) {

    let token  = new TokenModel({
        userId: user.username,
        token: uid(16),
        claims: []
    });


    return token.save()
        .then(function(resp){
            return resp.token
        },
        function(resp){
            console.log('Error');
            console.log(resp);
        })

};

module.exports = {
    checkToken: checkToken,
    createToken: createToken
};