const Score = require('../models/Score');

// Add or Update Total Score
const addOrUpdateScore = async (req, res) => {
    try {
        const { Player_ID, SQPoints_ID, MCQPoints_ID, categoryID } = req.body;

        // Check if a score already exists for the player
        let score = await Score.findOne({ Player_ID });

        if (score) {
            // Update existing score
            score.SQPoints_ID = SQPoints_ID;
            score.MCQPoints_ID = MCQPoints_ID;
            score.categoryID = categoryID || score.categoryID;

            const updatedScore = await score.save();
            return res.status(200).json({ message: 'Score updated successfully', data: updatedScore });
        }

        // Create a new score if none exists
        const newScore = new Score({
            Player_ID,
            SQPoints_ID,
            MCQPoints_ID,
            categoryID,
        });

        const savedScore = await newScore.save();
        res.status(201).json({ message: 'Score added successfully', data: savedScore });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add or update score', error: error.message });
    }
};

// Get Score by Player ID
const getScoreByPlayerID = async (req, res) => {
    try {
        const { playerID } = req.params;

        const score = await Score.findOne({ Player_ID: playerID })
            .populate('Player_ID', 'playername email')
            .populate('SQPoints_ID', 'score')
            .populate('MCQPoints_ID', 'score')
            .populate('categoryID', 'CategoryName');

        if (!score) {
            return res.status(404).json({ message: 'Score not found for this player' });
        }

        res.status(200).json(score);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch score', error: error.message });
    }
};

// Get All Scores
const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find()
            .populate('Player_ID', 'playername email')
            .populate('SQPoints_ID', 'score')
            .populate('MCQPoints_ID', 'score')
            .populate('categoryID', 'CategoryName');

        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch scores', error: error.message });
    }
};

// Delete Score by ID
const deleteScore = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedScore = await Score.findByIdAndDelete(id);
        if (!deletedScore) {
            return res.status(404).json({ message: 'Score not found' });
        }

        res.status(200).json({ message: 'Score deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete score', error: error.message });
    }
};

module.exports = {
    addOrUpdateScore,
    getScoreByPlayerID,
    getAllScores,
    deleteScore,
};
