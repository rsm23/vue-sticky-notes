const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require('../models/Note');

// Add new note
router.post('/', (req, res) => {
    let db = req.db;
    let {note} = req.body;
    let title = note.title;
    let text = note.text;
    let color = note.color;
    let date = note.date;
    let long = note.long;
    let completed = note.completed;
    let userId = note.userId;
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
router.get('/', (req, res) => {
    let id = req.query.id;
    Note.find({userId: id}, 'title text color date long completed', (error, notes) => {
        if (error) {
            console.error(error);
        }
        res.send({
            notes: notes
        })
    }).sort({_id: -1})
});

// Update a note
router.put('/:id', (req, res) => {
    var db = req.db;
    Note.findById(req.params.id, 'title text color date long completed userId', (error, note) => {
        if (error) {
            console.error(error);
        }
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
router.delete('/:id', (req, res) => {
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

module.exports = router;