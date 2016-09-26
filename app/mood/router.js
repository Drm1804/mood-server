'use strict';

const app = require('express').Router();
const MoodModel = require('./mongoose').MoodModel;
const token = require('../token');


// Список всех натроений
app.get('/moods', token.checkToken, function (req, res, next) {
    MoodModel.find(function (err, users) {
        res.json(users);
    });
});

// Добавление настроения
app.post('/moods', token.checkToken, function(req, res, next){

    const mood = new MoodModel({myMood: req.body.myMood, someoneMood: req.body.someoneMood});

    console.log(new Date())

});

module.exports = app;