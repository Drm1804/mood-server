'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const moment = require('moment');

const Mood = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    myMood: {
        type: Number,
        required: true
    },
    someoneMood: {
        type: Number,
        required: true
    },
    moodId: {
        type: String,
        required: true
    },
    created:{
        type: String,
        default: moment(new Date()).format("DD.MM.YYYY")
    }
});

const MoodModel = mongoose.model('Mood', Mood);

module.exports.MoodModel = MoodModel;