const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Feedback = require("../api/routes/models/feedback");
const config = require("./database");

module.exports = function(passport) {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      Feedback.findById(jwt_payload._id, (err, feedback) => {
        if (err) {
          return done(err, false);
        }
        if (feedback) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
