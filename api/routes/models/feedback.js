const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const feedBackSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  issue: { type: String, required: true },
  comment: { type: String, required: true },
  status: { type: Boolean },
  createdDate: { type: Date },
  password: { type: String },
});

module.exports = mongoose.model("FeedBack", feedBackSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
