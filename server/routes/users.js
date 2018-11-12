const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sha1 = require('sha1');
const nodeMailer = require('nodemailer');
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
        User.findOne({
            $or: [
                {email: req.body.email},
                {username: req.body.username}
            ]
        }, function (err, user) {
            if (user) {
                return res.send({
                    status: 401,
                    error: "A user with the same username or email"
                });
            } else {
                bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, function (err, hash) {
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
                res.send({
                    status: 403,
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

router.post('/reset', function (req, res) {
    let newPassword = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 9);

    User.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS, function (err, hash) {
                user.password = hash;
                user.save();
            });
        } else {
            console.log('User does not exist')
        }
    });
    sendMail(req.body.email, newPassword)
});

let sendMail = function (userEmail, newPasswprd) {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
            user: '', //Your email
            pass: '' // Your password
        }
    });

    const mailOptions = {
        from: '"Rahmani Seif El Moulouk" <rahmani@seifelmoulouk.com>', // sender address
        to: userEmail, // list of receivers
        subject: 'Your new password', // Subject line
        text: 'Your new password is : ' + newPasswprd, // plain text body
        html: `<p>This message has been sent from <b>Vue Sticky Notes</b><hr /></p><p>Your new password has been set to <b>${newPasswprd}</b></p><br />` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    });
};

module.exports = router;