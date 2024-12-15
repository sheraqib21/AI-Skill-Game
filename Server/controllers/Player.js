const Player = require('../models/Player');


const createPlayer = async (req, res) => {
    try {
        const { playername, email, password } = req.body;

        
        const existingPlayer = await Player.findOne({ email });
        if (existingPlayer) {
            return res.status(400).json({ message: 'Player already exists with this email.' });
        }

        
        const newPlayer = new Player({
            playername,
            email,
            password, 
        });

        const savedPlayer = await newPlayer.save();
        res.status(201).json({ message: 'Player registered successfully.', data: savedPlayer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create player', error: error.message });
    }
};

// Get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch players', error: error.message });
    }
};

// Get a player by ID
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch player', error: error.message });
    }
};

// Update a player's profile
const updatePlayer = async (req, res) => {
    try {
        const { playername, email, mcqscore, sqscore, totalpoints } = req.body;

        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            {
                playername,
                email,
                mcqscore,
                sqscore,
                totalpoints,
            },
            { new: true, runValidators: true }
        );

        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({ message: 'Player updated successfully', data: updatedPlayer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update player', error: error.message });
    }
};

// Delete a player
const deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete player', error: error.message });
    }
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
};
