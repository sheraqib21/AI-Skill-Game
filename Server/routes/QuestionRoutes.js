const express = require('express');
const { getQuestions } = require('../controllers/Question');
const QuestionRoutes = express.Router();

// POST route for questions
QuestionRoutes.post('/questions', getQuestions);

module.exports = QuestionRoutes;
