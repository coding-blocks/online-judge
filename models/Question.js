// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called codingblocks
mongoose.createConnection('mongodb://localhost/codingblocks');

// Create a schema
var QuestionSchema = new mongoose.Schema({
  title: String,
  decription: String,
  training_data: String,
  max_score: Number,
  expected_output: String,
  assignment_id: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', QuestionSchema);
