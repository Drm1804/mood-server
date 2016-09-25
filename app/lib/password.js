'use strict';

const crypto = require('crypto');
const config = require('../config');
const secretKey = config.get('session').secret;


const checkPass = function(loginUser, dataUser){

    const loginPassHash = crypto.createHmac('sha256', secretKey)
        .update(loginUser.pass)
        .digest('hex');

    return loginPassHash === dataUser.password;
};


module.exports = {
    checkPass:checkPass
};