const mongoose = require('mongoose');

const MCQQuestionSchema = new mongoose.Schema({
    questionID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    question: { type: String, required: true },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
    correctAnswer: { type: String, required: true },
    playerAnswer: { type: String },
    

}, { timestamps: true });

const Mcq = mongoose.model('Mcq', MCQQuestionSchema);
module.exports = Mcq;