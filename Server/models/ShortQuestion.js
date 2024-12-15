const mongoose = require('mongoose');

const ShortQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const ShortQuestion = mongoose.model('ShortQuestion', ShortQuestionSchema);
module.exports = ShortQuestion;
