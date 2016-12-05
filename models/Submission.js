// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called codingblocks
mongoose.createConnection('mongodb://localhost/codingblocks');

// Create a schema
var SubmissionSchema = new mongoose.Schema({
  user: String,
  score: {type: Number, default: -1},
  output_file: {type: String, default: ""},
  question_id: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
