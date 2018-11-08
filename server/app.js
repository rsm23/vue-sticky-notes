const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('*', cors());
app.use(morgan('combined'));
app.use( express.static(__dirname+'/uploads'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true, useCreateIndex: true});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (callback) => {
    console.log("Connection Succeeded");
});


app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:8080'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.use(function(err, req, res, next) {
    console.log(err);
    next(err);
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(process.env.PORT || 8081);