var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    color: String,
    completed: Boolean,
    date: Date,
    long: Boolean,
    text: String,
    title: String
});

let Note = mongoose.model("Note", NoteSchema);
module.exports = Note;