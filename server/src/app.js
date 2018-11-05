const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true, useCreateIndex: true});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (callback) => {
    console.log("Connection Succeeded");
});

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, 'secret', {
        expiresIn: ONE_WEEK
    })
}

//POST route for updating data
app.post('/users', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        let err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.name &&
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        let userData = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        };

        User.create(userData, function (error, user) {
            if (error) {
                return res.status(500).send({
                    error : 'Something went wrong.'
                });
            } else {
                console.log("here");
                let jUser = user.toJSON();
                res.send({
                    user : jUser,
                    token: jwtSignUser(jUser),
                })
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                return res.status(403).send({
                    error : 'Wrong email or password.'
                });
            } else {
                let jUser = user.toJSON();
                res.send({
                    user : jUser,
                    token: jwtSignUser(jUser),
                })
            }
        });
    } else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// Add new note
app.post('/notes', (req, res) => {
    let db = req.db;
    let title = req.body.note.title;
    let text = req.body.note.text;
    let color = req.body.note.color;
    let date = req.body.note.date;
    let long = req.body.note.long;
    let completed = req.body.note.completed;
    let userId = req.body.note.userId;
    let new_note = new Note({
        color,
        completed,
        date,
        long,
        text,
        title,
        userId
    });

    new_note.save((error) => {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Note has been saved successfully!'
        })
    })
});

// Fetch all notes
app.get('/notes', (req, res) => {
    let id = req.query.id;
    Note.find({userId : id}, 'title text color date long completed', (error, notes) => {
        if (error) {
            console.error(error);
        }
        res.send({
            notes: notes
        })
    }).sort({_id: -1})
});

// Update a note
app.put('/notes/:id', (req, res) => {
    var db = req.db;
    Note.findById(req.params.id, 'title text color date long completed userId', (error, note) => {
        if (error) {
            console.error(error);
        }
        console.log(req.body);
        note.title = req.body.title;
        note.text = req.body.text;
        note.color = req.body.color;
        note.date = req.body.date;
        note.long = req.body.long;
        note.completed = req.body.completed;
        note.userId = req.body.userId;
        note.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    var db = req.db;
    Note.remove({
        _id: req.params.id
    }, function (err, note) {
        if (err)
            res.send(err);
        res.send({
            success: true
        })
    })
});
app.listen(process.env.PORT || 8081);