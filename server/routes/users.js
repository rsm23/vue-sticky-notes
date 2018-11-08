const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sha1 = require('sha1');
const BCRYPT_SALT_ROUNDS = 12;

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, 'secret', {
        expiresIn: ONE_WEEK
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let regExFileNameExtension = /\.[0-9a-z]{1,5}$/i,
            fileNameExtension = file.originalname.match(regExFileNameExtension)[0];
        cb(null, sha1(new Date().toISOString() + file.originalname) + fileNameExtension);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//POST route for updating data
router.post('/', function (req, res, next) {
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
        req.body.password) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (user) {
                return res.status(401).send('That user already exists!');
            } else {

                bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, function (err,   hash) {
                    user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        avatar: "avatar.png",
                        about: "",
                        password: hash
                    });
                    user.save();

                    let jUser = user.toJSON();
                    console.log(jUser);
                    res.send({
                        user: jUser,
                        token: jwtSignUser(jUser),
                    });
                });
            }
        });


    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                return res.status(403).send({
                    error: 'Wrong email or password.'
                });
            } else {
                let jUser = user.toJSON();
                res.send({
                    user: jUser,
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

// Update user's details
router.put('/', function (req, res) {
    User.findById(req.body.id, 'name email about avatar username', (error, user) => {
        if (error) {
            console.error(error);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.about = req.body.about;
        user.save(function (error) {
            if (error) {
                console.log(error)
            }
            let jUser = user.toJSON();
            res.send({
                user: jUser,
                token: jwtSignUser(jUser),
            })
        })
    })
});
// Update user's avatar
router.put('/avatar', upload.single("avatar"), function (req, res) {
    User.findById(req.body.id, 'name email about avatar username', (error, user) => {
        if (error) {
            console.error(error);
        }
        user.avatar = req.file.filename;
        user.save(function (error) {
            if (error) {
                console.log(error)
            }
            let jUser = user.toJSON();
            res.send({
                user: jUser,
                token: jwtSignUser(jUser),
            })
        })
    })
});

module.exports = router;