const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
let mongoose = require('mongoose');
let Note = require('../models/Note');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/notes');
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (callback) => {
    console.log("Connection Succeeded");
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
    let new_note = new Note({
        color,
        completed,
        date,
        long,
        text,
        title,
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
    Note.find({}, 'title text color date long completed', (error, notes) => {
        if (error) { console.error(error); }
        res.send({
            notes: notes
        })
    }).sort({_id:-1})
});

// Update a note
app.put('/notes/:id', (req, res) => {
    var db = req.db;
    Note.findById(req.params.id, 'title text color date long completed', (error, note) => {
        if (error) { console.error(error); }
        console.log(req.body);
        note.title = req.body.title;
        note.text = req.body.text;
        note.color = req.body.color;
        note.date = req.body.date;
        note.long = req.body.long;
        note.completed = req.body.completed;
        note.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

// Delete a note
app.delete('/notes/:id', (req, res) => {
    var db = req.db;
    Note.remove({
        _id: req.params.id
    }, function(err, note){
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
});
app.listen(process.env.PORT || 8081);