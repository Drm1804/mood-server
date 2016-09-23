'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const AccessToken = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    claims: {
        type: Array
    }
});

const AccessTokenModel = mongoose.model('Token', AccessToken);

module.exports.AccessTokenModel = AccessTokenModel;