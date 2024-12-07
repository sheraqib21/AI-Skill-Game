// models/questionModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  type: {
    type: String, // 'mcq' or 'short'
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],  // For MCQs
    default: [],
  },
  correctAnswer: {
    type: String,   
    required: true,
  },
});

const Question= mongoose.model('Question', questionSchema);
module.exports = Question;
