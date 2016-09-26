'use strict';

const app = require('express').Router();
const MoodModel = require('./mongoose').MoodModel;
const AccessTokenModel = require('../token/mongoose').AccessTokenModel;
const token = require('../token');
const moment = require('moment');
const uid = require('rand-token').uid;

const checkDate = function (req, res, next) {

    console.log(req.body);
    // debugger;

    next();
};

/**
 * Метод todayMood получает на вход id пользователя.
 *
 * Метод ищет mood для текузего пользователя и текщей даты. Mood найден возвращает resolve(true),
 * если не найден resolve(false). Если метод закончился ошибкой, то возвращается reject
 *
 * */

const todayMood = function (userId) {
    const nowDate = moment(new Date()).format("DD.MM.YYYY");

    return new Promise(function(resolve, reject){
        MoodModel.find({userId: userId, created: nowDate})
            .exec(function(err, mood){
                if(err){
                    return reject();
                } else {
                    if (mood.length > 0) {
                        return resolve(false)
                    } else {
                        return resolve(true);
                    }
                }
            })
    });

};

// Список всех натроений
app.get('/moods', token.checkToken, function (req, res, next) {
    MoodModel.find(function (err, users) {
        res.json(users);
    });
});

// Добавление настроения
app.post('/moods', token.checkToken, function (req, res, next) {

    const findToken = AccessTokenModel.findOne({token: req.headers.authorization}).exec();

    findToken.then(function (resp) {
        const userId = resp.userId;
        const mood = new MoodModel({
            myMood: req.body.myMood,
            someoneMood: req.body.someoneMood,
            userId: userId,
            moodId: uid(25)
        });

        todayMood(userId)
            .then(function (respToday) {
                    if (respToday) {
                        mood.save(function (err) {
                            if (!err) {
                                res.status(200).send({status: 'OK'})
                            } else {
                                res.statusCode = 500;
                                res.send({error: 'Server error'});
                                console.error('Internal error(%d): %s', res.statusCode, err.message);
                            }
                        });
                    } else {
                        res.status(403).send(`You can't add more one mood at day!`);
                    }

                }, function () {
                    res.status(500).send({error: 'Server error'});
                }
            );

    }, function (err) {
        res.statusCode = 500;
        res.send({error: 'Server error'});
        console.error('Internal error(%d): %s', res.statusCode, err.message);
    });


});

//Редактирование настроения
app.put('/moods/:id', token.checkToken, checkDate, function (req, res, next) {



    // const findToken = AccessTokenModel.findOne({token: req.headers.authorization}).exec();
    // let userId = '';
    //
    //
    // findToken.then(function (resp) {
    //     userId = resp.userId;
    //
    //     todayMood(userId)
    //         .then(function(){
    //             const mood = new MoodModel(
    //                 {
    //                     userId: userId,
    //                     myMood: req.body.myMood,
    //                     someoneMood: req.body.someoneMood
    //                 }
    //             );
    //             return mood.save()
    //         });
    //
    //
    // }, function (err) {
    //     res.statusCode = 500;
    //     res.send({error: 'Server error'});
    //     console.error('Internal error(%d): %s', res.statusCode, err.message);
    // });

    // return mood.save()
    //     .then(function (resp) {
    //         console.log(resp);
    //         return res.send(200, {status: 'OK'});
    //     }, function(err){
    //         res.statusCode = 500;
    //         res.send({error: 'Server error'});
    //         console.error('Internal error(%d): %s', res.statusCode, err.message);
    //     })
    return res.send(200, {status: 'OK'});
});

module.exports = app;