const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FeedBackModel = require("./models/feedback");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/database");

// Register user
router.post("/save", (req, res, next) => {
  console.log("req bodyyyy: ", req.body.user.issue);
  const feedback = new FeedBackModel({
    _id: new mongoose.Types.ObjectId(),
    issue: req.body.user.issue,
    comment: req.body.user.comment,
    createdDate: Date.now(),
    status: true,
    password: "111",
  });

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(feedback.password, salt, function(err, hash) {
      if (!err) {
        feedback.password = hash;
        feedback.save((err, data) => {
          if (!err) {
            res.status(200).json({
              message: "feedback created",
              data: data,
            });
          } else {
            res.status(404).json({
              message: " user cannot created",
              error: err,
            });
          }
        });
      }
      console.log("hash: ", hash);
      // Store hash in your password DB.
    });
  });
});

router.get("/getList", (req, res, next) => {
  FeedBackModel.find({}, (err, feedbacks) => {
    if (!err && feedbacks) {
      res.status(200).json({
        // count: feedbacks.length,
        feedbacks: feedbacks.map((data) => {
          return {
            _id: data._id,
            issue: data.issue,
            comment: data.comment,
            status: data.status,
            createdDate: data.createdDate,
          };
        }),
      });
    } else {
      res.status(500).json({
        message: "couldnt product",
      });
    }
  });
});

// //Authenticate
// router.post("/authenticate", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   UserModel.findOne(
//     {
//       username: username,
//     },
//     (err, user) => {
//       if (err) {
//         res.status(404).json({
//           message: "User not found",
//           error: err,
//         });
//       }
//       if (user) {
//         UserModel.comparePassword(password, user.password, (err, isMatch) => {
//           if (err) throw err;
//           if (isMatch) {
//             const token = jwt.sign(user.toJSON(), config.secret); // user.toJSON() to serialize json object
//             console.log("token: ", token);

//             res.json({
//               success: true,
//               token: token, // create bearer jwt token
//               user: user,
//             });
//           }
//         });
//       } else {
//         res.json({
//           success: false,
//           message: " not much password",
//         });
//       }
//     }
//   );
// });

// GET Profile
// router.get(
//   "/profile",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   (req, res, next) => {
//     res.json({
//       user: req.user,
//     });
//   }
// );

// Validate
// router.get("/validate", (req, res, next) => {
//   res.status(200).json({
//     message: "Validate running",
//   });
// });

module.exports = router;
