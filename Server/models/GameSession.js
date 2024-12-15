const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
    sessionID: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    playerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['MCQ', 'ShortQuestion'],
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: function () {
            return this.questionType === 'MCQ';
        },
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    userAnswer: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
    },
    startedAt: {
        type: Date,
        default: Date.now, // Time when the game starts
    },
    completedAt: {
        type: Date, // Time when the game is completed
    },
    timeTaken: {
        type: Number, // Duration in seconds
    },
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
