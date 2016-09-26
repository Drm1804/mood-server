'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const Mood = new mongoose.Schema({
    myMood: {
        type: Number,
        required: true
    },
    someoneMood: {
        type: Number,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

const MoodModel = mongoose.model('Mood', Mood);

module.exports.MoodModel = MoodModel;