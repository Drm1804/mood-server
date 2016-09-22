'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const dbConf = config.get('db');


mongoose.connect(dbConf.connection);

const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});

db.once('open', function callback () {
    console.info("Connected to DB!");
});


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;