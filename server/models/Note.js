let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    color: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    long: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

let Note = mongoose.model("Note", NoteSchema);
module.exports = Note;