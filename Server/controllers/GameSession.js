const GameSession = require('../models/GameSession');

// Start a new game session
const startGameSession = async (req, res) => {
    try {
        const { playerID, categoryID, level, questionType, question, options, correctAnswer } = req.body;

        // Create a new game session
        const newGameSession = new GameSession({
            playerID,
            categoryID,
            level,
            questionType,
            question,
            options,
            correctAnswer,
            startedAt: Date.now(), // Start time
        });

        const session = await newGameSession.save();
        res.status(201).json({ message: 'Game session started', data: session });
    } catch (error) {
        res.status(500).json({ message: 'Failed to start game session', error: error.message });
    }
};

// Submit a game session (End the game)
const submitGameSession = async (req, res) => {
    try {
        const { sessionID, userAnswer, score } = req.body;

        // Find the game session
        const session = await GameSession.findById(sessionID);
        if (!session) {
            return res.status(404).json({ message: 'Game session not found' });
        }

        // Update the session with user answer, completion time, and score
        session.userAnswer = userAnswer;
        session.isCorrect = session.correctAnswer === userAnswer;
        session.score = session.isCorrect ? score : 0;
        session.completedAt = Date.now();

        // Calculate the time taken in seconds
        session.timeTaken = Math.round((session.completedAt - session.startedAt) / 1000);

        const updatedSession = await session.save();
        res.status(200).json({
            message: 'Game session submitted successfully',
            data: updatedSession,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit game session', error: error.message });
    }
};

// Get all game sessions
const getAllGameSessions = async (req, res) => {
    try {
        const sessions = await GameSession.find().populate('playerID', 'playername email');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch game sessions', error: error.message });
    }
};

// Get all game sessions for a specific player
const getGameSessionsByPlayer = async (req, res) => {
    try {
        const { playerID } = req.params;
        const sessions = await GameSession.find({ playerID }).populate('categoryID', 'CategoryName');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch game sessions for player', error: error.message });
    }
};

module.exports = {
    startGameSession,
    submitGameSession,
    getAllGameSessions,
    getGameSessionsByPlayer,
};
