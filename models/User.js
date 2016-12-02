// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called codingblocks
mongoose.connect('mongodb://localhost/codingblocks');

// Create a schema
var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  college: {type: String, default: ""},
  github_url: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
