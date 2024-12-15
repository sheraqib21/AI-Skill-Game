const express = require('express');
const {
    addOrUpdateScore,
    getScoreByPlayerID,
    getAllScores,
    deleteScore,
} = require('../controllers/Score');

const ScoreRouter = express.Router();

// Add or Update Score
ScoreRouter.post('/add', addOrUpdateScore);

// Get Score by Player ID
ScoreRouter.get('/player/:playerID', getScoreByPlayerID);

// Get All Scores
ScoreRouter.get('/all', getAllScores);

// Delete Score by ID
ScoreRouter.delete('/:id', deleteScore);

module.exports = ScoreRouter;
