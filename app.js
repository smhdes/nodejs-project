const express = require("express");
const app = express(); // execute for express utility function and properties
const feedBacksRouter = require("./api/routes/feedbacks");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/database");
const cors = require("cors");
const passport = require("passport");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
mongoose.connection.on("error", (error) => {
  console.log("error connected db: ", error);
});

mongoose.Promise = global.Promise;
app.use(cors()); // public for any request from difference domains

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false })); // handle body parameter value (such as req.body.name)
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Handle request
app.use("/feedbacks/", feedBacksRouter);

// initialize error method and set the below
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// handle error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// app.get('/',(req, res) => {
//     res.json({message: ' hello from app get function'});
// });

module.exports = app; // if we want to use it the other files
