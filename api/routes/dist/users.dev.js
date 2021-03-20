"use strict";

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var UserModel = require('./models/user');

var bcrypt = require('bcrypt');

var saltRounds = 10;

var passport = require('passport');

var jwt = require('jsonwebtoken');

var config = require('../../config/database'); // Register user


router.post('/register', function (req, res, next) {
  console.log('req body: ', req.body);
  var user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.password,
    birthDate: req.body.birthDate,
    address: req.body.address,
    password: req.body.password
  });
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (!err) {
        user.password = hash;
        user.save(function (err, data) {
          if (!err) {
            res.status(200).json({
              message: 'user created',
              data: data
            });
          } else {
            res.status(404).json({
              message: ' user cannot created',
              error: err
            });
          }
        });
      }

      console.log('hash: ', hash); // Store hash in your password DB.
    });
  });
}); //Authenticate

router.post('/authenticate', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  UserModel.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      res.status(404).json({
        message: 'User not found',
        error: err
      });
    }

    if (user) {
      UserModel.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;

        if (isMatch) {
          var token = jwt.sign(user.toJSON(), config.secret); // user.toJSON() to serialize json object

          console.log('token: ', token);
          res.json({
            success: true,
            token: token,
            // create bearer jwt token
            user: user
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: ' not much password'
      });
    }
  });
}); //GET Profile

router.get('/profile', passport.authenticate('jwt', {
  session: false
}), function (req, res, next) {
  res.json({
    user: req.user
  });
}); // Validate

router.get('/validate', function (req, res, next) {
  res.status(200).json({
    message: 'Validate running'
  });
});
module.exports = router;