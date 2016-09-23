'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    claims: {
        type: Array
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;